import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TJwtPayload } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const isUserExistsWithErrorMessageByCustomId = async (id: string) => {
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, `This User is not found!`);
  }
  return user;
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

// Create ACCESS token
export const createAccessToken = (jwtPayload: TJwtPayload) => {
  return createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string,
  );
};

// Create REFRESH token
export const createRefreshToken = (jwtPayload: TJwtPayload) => {
  return createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string,
  );
};
