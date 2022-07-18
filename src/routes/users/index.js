import { Router } from 'express';
import userController from '../../controllers/user.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import {
  validationSchemaPost as validationSchemaUserPost,
  validationSchema as validationSchemaUserPut,
  validationSchemaPassword as validationSchemaUserPassword,
} from '../../daos/user.js';

const router = Router();
router.post(
  '/add',
  validationSchemaUserPost,
  validateRequestSchema,
  userController.createUser
);

router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put(
  '/:id',
  validationSchemaUserPut,
  validateRequestSchema,
  userController.updateUser
);

router.put(
  '/:id/password',
  validationSchemaUserPassword,
  validateRequestSchema,
  userController.updateUserPassword
);

router.delete('/:id', userController.deleteUser);

export default router;
