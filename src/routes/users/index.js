import { Router } from 'express';
import userController from '../../controllers/user.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import {
  validationSchemaRegister as validationSchemaUserRegister,
  validationSchemaProfile as validationSchemaUserProfile,
  validationSchemaPassword as validationSchemaUserPassword,
  validationSchemaLogin as validationSchemaUserLogin,
} from '../../daos/user.js';
import authToken from '../../middlewares/authToken.js';

const router = Router();
router.post(
  '/register',
  validationSchemaUserRegister,
  validateRequestSchema,
  userController.register
);

router.post(
  '/login',
  validationSchemaUserLogin,
  validateRequestSchema,
  userController.login
);


router.put(
  '/update',
  authToken,
  validationSchemaUserProfile,
  validateRequestSchema,
  userController.updateUser
);

router.put(
  '/update-password',
  authToken,
  validationSchemaUserPassword,
  validateRequestSchema,
  userController.updateUserPassword
);

export default router;
