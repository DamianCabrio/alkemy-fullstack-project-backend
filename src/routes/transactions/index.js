import { Router } from 'express';
import transactionController from '../../controllers/transaction.js';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js';
import { validationSchemaPost as validationSchemaTransactionPost, validationSchema as validationSchemaTransactionPut } from '../../daos/transaction.js';

const router = Router();
router.post(
  '/add',
  validationSchemaTransactionPost,
  validateRequestSchema,
  transactionController.createTransaction
);

router.get('/:id', transactionController.getTransaction);
router.get('/', transactionController.getAllTransactions);
router.put(
  '/:id',
  validationSchemaTransactionPut,
  validateRequestSchema,
  transactionController.updateTransaction
);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
