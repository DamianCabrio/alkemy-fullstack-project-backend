import { Router } from 'express';
import rateLimiter from 'express-rate-limit';

import userController from '../../controllers/user.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import {
  validationSchemaRegister as validationSchemaUserRegister,
  validationSchemaProfile as validationSchemaUserProfile,
  validationSchemaPassword as validationSchemaUserPassword,
  validationSchemaLogin as validationSchemaUserLogin,
} from '../../daos/user.js';
import authToken from '../../middlewares/authToken.js';
import { error } from '../../helpers/responses.js';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  handler: (req, res) => {
    error(res, 'Demasiados intentos, por favor vuelva a intentar mas tarde', 429);
  }
});

const router = Router();
router.post(
  '/register',
  apiLimiter,
  validationSchemaUserRegister,
  validateRequestSchema,
  userController.register
);

router.post(
  '/login',
  apiLimiter,
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
