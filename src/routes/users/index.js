import { Router } from 'express';
import userController from '../../controllers/user.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import {
  validationSchemaPost as validationSchemaUserPost,
  validationSchema as validationSchemaUserPut,
  validationSchemaPassword as validationSchemaUserPassword,
  validationSchemaLogin as validationSchemaUserLogin,
} from '../../daos/user.js';
import authToken from '../../middlewares/authToken.js';

const router = Router();
router.post(
  '/register',
  validationSchemaUserPost,
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
  '/:id',
  authToken,
  validationSchemaUserPut,
  validateRequestSchema,
  userController.updateUser
);

router.put(
  '/:id/password',
  authToken,
  validationSchemaUserPassword,
  validateRequestSchema,
  userController.updateUserPassword
);

export default router;
