import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

// router.post('/create-Faculty', FacultyController.createFaculty);

router.get('/', FacultyController.getAllFaculties);

router.get('/:FacultyId', FacultyController.getSingleFaculty);

router.patch(
  '/:FacultyId',
  //   validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

router.delete('/:FacultyId', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
