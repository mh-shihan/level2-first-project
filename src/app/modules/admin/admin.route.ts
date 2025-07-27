import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

router.get('/:adminId', AdminController.getSingleAdmin);

router.patch(
  '/:adminId',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

router.delete('/:adminId', AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
