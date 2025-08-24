import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getAllFaculties,
);

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

router.delete('/:id', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
