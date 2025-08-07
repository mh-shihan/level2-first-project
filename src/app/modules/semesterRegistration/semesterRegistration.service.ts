import status from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegisteredSemesterStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // Checking is there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegisteredSemesterStatus.UPCOMING },
        { status: RegisteredSemesterStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester exists!`,
    );
  }
  // Check If the semester is already exists?
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(status.NOT_FOUND, 'This academic semester is not found');
  }

  // Check if the semester is already registered?
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(status.CONFLICT, 'This semester is already registered!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Check is the Registered Semester exists?
  // Check if the semester is already registered?
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, 'This semester is not found!');
  }

  // If the updated semester registration is ended then we will not update anything
  const currentRegisteredSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedRegisteredSemesterStatus = payload?.status;

  if (currentRegisteredSemesterStatus === RegisteredSemesterStatus.ENDED) {
    throw new AppError(
      status.BAD_REQUEST,
      `This semester is already ${currentRegisteredSemesterStatus}!`,
    );
  }

  if (
    currentRegisteredSemesterStatus === RegisteredSemesterStatus.UPCOMING &&
    requestedRegisteredSemesterStatus === RegisteredSemesterStatus.ENDED
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentRegisteredSemesterStatus} to ${requestedRegisteredSemesterStatus}`,
    );
  }

  if (
    currentRegisteredSemesterStatus === RegisteredSemesterStatus.ONGOING &&
    requestedRegisteredSemesterStatus === RegisteredSemesterStatus.UPCOMING
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentRegisteredSemesterStatus} to ${requestedRegisteredSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
