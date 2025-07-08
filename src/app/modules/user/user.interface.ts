export type TUser = {
  id: string;
  password: string;
  needsPasswordChanged: string;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
