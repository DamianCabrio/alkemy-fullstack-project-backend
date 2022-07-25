import { Router } from 'express';
import transactionTypeController from '../../controllers/transaction_type.js';

const router = Router();

router.get('/:id', transactionTypeController.getTransactionType);
router.get('/', transactionTypeController.getAllTransactionTypes);

export default router;
