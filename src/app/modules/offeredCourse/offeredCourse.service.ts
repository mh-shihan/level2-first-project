import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import checkDocumentExistsById from '../../utils/checkDocumentExistsById';
import { Faculty } from '../faculty/faculty.model';
import { Types } from 'mongoose';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // Check if the SEMESTER REGISTRATION id is exists!
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  let academicSemester: Types.ObjectId = new Types.ObjectId();

  // Check existence using utility function
  const isSemesterRegistrationExists = await checkDocumentExistsById(
    SemesterRegistration,
    semesterRegistration,
    'Semester Registration',
  );
  if (isSemesterRegistrationExists) {
    academicSemester = isSemesterRegistrationExists.academicSemester;
  }

  await checkDocumentExistsById(
    AcademicFaculty,
    academicFaculty,
    'Academic Faculty',
  );

  await checkDocumentExistsById(
    AcademicDepartment,
    academicDepartment,
    'Academic Department',
  );

  await checkDocumentExistsById(Course, course, 'Course');

  await checkDocumentExistsById(Faculty, faculty, 'Faculty');

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
