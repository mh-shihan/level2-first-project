export type TRole = 'admin' | 'student' | 'faculty';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: TRole;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
