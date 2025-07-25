import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:studentId', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
