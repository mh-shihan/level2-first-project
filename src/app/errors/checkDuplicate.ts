import status from 'http-status';
import { Model } from 'mongoose';
import AppError from './AppError';

const checkDuplicate = async <T>(
  model: Model<T>,
  field: keyof T,
  value: unknown,
  entityName = 'Data',
): Promise<void> => {
  const condition: Record<string, unknown> = { [field as string]: value };

  const isExists = await model.findOne(condition);

  if (isExists) {
    throw new AppError(
      status.CONFLICT,
      `${entityName} with this ${String(field)} already exists!`,
    );
  }
};

export default checkDuplicate;
