import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculties are retrieved successfully!',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(FacultyId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Faculty is retrieved successfully!',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const { Faculty } = req.body;

  const result = await FacultyServices.updateFacultyIntoDB(FacultyId, Faculty);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is updated successfully!',
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await FacultyServices.deleteSingleFacultyFromDB(FacultyId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Faculty is deleted successfully!',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
