import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  // If password is not given use default password
  userData.password = password || (config.default_password as string);

  // Set Student Role
  userData.role = 'student';

  // Set Manually Generated ID
  userData.id = '2030100003';

  const newUser = await User.create(userData);

  // Create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // Reference id
  }

  const newStudent = await Student.create(studentData);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
