import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

router.delete('/:id', AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
