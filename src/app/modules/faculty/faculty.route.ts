import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', FacultyController.getAllFaculties);

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

router.delete('/:id', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
