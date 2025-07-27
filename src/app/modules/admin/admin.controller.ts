import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admins are retrieved successfully!',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Admin is retrieved successfully!',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  console.log({ admin });

  const result = await AdminServices.updateAdminIntoDB(adminId, admin);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is updated successfully!',
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteSingleAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Admin is deleted successfully!',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteSingleAdmin,
};
