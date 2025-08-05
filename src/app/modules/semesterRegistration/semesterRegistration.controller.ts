import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.semesterRegistrationIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester is Registered successfully!',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
};
