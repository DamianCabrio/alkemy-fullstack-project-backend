import { Router } from "express";
import transactionController from "../../controllers/transaction.js";

const router = Router();
router.post("/", transactionController.createTransaction);

export default router;