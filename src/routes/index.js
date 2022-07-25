import { Router } from 'express';
import transactionsRouter from './transactions/index.js';
import categoriesRouter from './categories/index.js';
import transactionTypesRouter from './transaction_type/index.js';
import usersRouter from './users/index.js';
import authToken from '../middlewares/authToken.js';

const router = Router();

router.use('/users', usersRouter);

router.use('/transactions', authToken, transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/transaction-types', transactionTypesRouter);


export default router;