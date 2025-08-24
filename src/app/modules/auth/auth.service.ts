import status from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import isUserExists from './auth.utils';
import { User } from '../user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const user = await isUserExists(payload.id);

  //   checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'This user is deleted!');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'This user is blocked! !');
  }

  //   Checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(status.FORBIDDEN, 'Password do not matched!');
  }

  //   Create Token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return {
    accessToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await isUserExists(userData.userId);

  //   checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'This user is deleted!');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'This user is blocked! !');
  }

  // Checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(status.FORBIDDEN, 'Password do not matched!');
  }

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
