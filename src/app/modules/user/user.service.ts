import status from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  // If password is not given use default password
  userData.password = password || (config.default_password as string);

  // Set Student Role
  userData.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicSemester) {
    throw new AppError(status.NOT_FOUND, 'Academic semester Not Found');
  }
  // Set Manually Generated ID
  userData.id = await generatedStudentId(academicSemester);

  const newUser = await User.create(userData);

  // Create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // Reference id
  }

  const newStudent = await Student.create(payload);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
