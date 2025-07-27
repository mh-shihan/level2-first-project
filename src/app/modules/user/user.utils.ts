import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TRole } from './user.interface';
import { User } from './user.model';

const getLastUserByRole = async (role: TRole) => {
  const lastUser = await User.findOne(
    {
      role: role,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  if (!lastUser?.id) return undefined;

  return role === 'student' ? lastUser.id : lastUser.id.substring(2);
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await getLastUserByRole('student');
  // 2030 01 0001
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentYear = payload.year;
  const currentCode = payload.code;

  if (
    lastStudentId &&
    lastStudentYear === currentYear &&
    lastStudentSemesterCode === currentCode
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export const generateUserIdByRole = async (role: TRole) => {
  let currentId = (0).toString();
  const lastUserId = await getLastUserByRole(role);

  if (lastUserId) {
    currentId = lastUserId.substring(2);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  const facultyId = `F-${incrementId}`;
  const adminId = `A-${incrementId}`;

  return role === 'faculty' ? facultyId : adminId;
};
