import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const isUserExists = async (id: string) => {
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, `This User is not found!`);
  }
  return user;
};

export default isUserExists;
