import status from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // Set Student Role
  userData.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicSemester) {
    throw new AppError(status.NOT_FOUND, 'Academic semester Not Found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Set Generated ID
    userData.id = await generatedStudentId(academicSemester);

    // Create a User (Transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create User');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference id

    // Create a Student (Transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
