import { Router } from "express";
import transactionsRouter from "./transactions/index.js";

const router = Router();

router.use("/transaction", transactionsRouter);

export default router;