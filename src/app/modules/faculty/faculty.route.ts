import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// router.post('/create-Faculty', FacultyController.createFaculty);

router.get('/', FacultyController.getAllFaculties);

router.get('/:facultyId', FacultyController.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

router.delete('/:facultyId', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
