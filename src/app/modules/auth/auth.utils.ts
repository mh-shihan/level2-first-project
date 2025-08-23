import status from 'http-status';
import { Model } from 'mongoose';
import AppError from '../../errors/AppError';

const checkDocumentExistsByCustomId = async <T>(
  model: Model<T>,
  id: string,
  message: string,
) => {
  const document = await model.findOne({ id });
  if (!document) {
    throw new AppError(status.NOT_FOUND, `${message} not found!`);
  }
  return document;
};

export default checkDocumentExistsByCustomId;
