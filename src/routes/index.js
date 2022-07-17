import { Router } from "express";
import transactionsRouter from "./transactions/index.js";

const router = Router();

router.use("/transactions", transactionsRouter);

export default router;