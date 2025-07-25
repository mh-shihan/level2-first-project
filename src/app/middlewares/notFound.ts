/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import status from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
};

export default notFound;
