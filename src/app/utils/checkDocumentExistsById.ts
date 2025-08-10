import status from 'http-status';
import { Model, Types } from 'mongoose';
import AppError from '../errors/AppError';

const checkDocumentExistsById = async <T>(
  model: Model<T>,
  id: Types.ObjectId,
  message: string,
) => {
  const isExists = await model.findById(id);
  const document = await model.findById(id);
  if (!isExists) {
    throw new AppError(status.NOT_FOUND, `${message} not found!`);
  }
  return document;
};

export default checkDocumentExistsById;
