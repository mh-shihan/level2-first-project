import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
