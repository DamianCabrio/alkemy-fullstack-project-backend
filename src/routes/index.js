import { Router } from "express";
import transactionsRouter from "./transactions";

const router = Router();

router.use("/transactions", transactionsRouter);

export default router;