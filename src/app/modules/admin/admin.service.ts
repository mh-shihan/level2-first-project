import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import { TAdmin } from './admin.interface';
import flattenNestedObject from '../../utils/flattenNestedObject';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(
    Admin.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicAdmin',
      },
    }),
    query,
  )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AdminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicAdmin',
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, `Admin with ID ${id} not found`);
  }

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  flattenNestedObject('name', name, modifiedUpdatedData);

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, `Admin with ID ${id} not found`);
  }

  return result;
};

const deleteSingleAdminFromDB = async (id: string) => {
  const isAdminExist = await Admin.isUserExists(id);
  if (!isAdminExist) {
    throw new AppError(status.NOT_FOUND, 'Admin Not Found!');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Failed to delete Admin',
      );
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteSingleAdminFromDB,
};
