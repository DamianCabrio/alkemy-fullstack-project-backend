import { Router } from 'express';
import transactionController from '../../controllers/transaction.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import { validationSchema as transactionSchema } from '../../daos/transaction.js';

const router = Router();
router.post(
  '/',
  transactionSchema,
  validateRequestSchema,
  transactionController.createTransaction
);

export default router;
