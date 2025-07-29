import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculties);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
