import { Router } from "express";
import transactionsRouter from "./transactions/index.js";
import categoriesRouter from "./categories/index.js";
import usersRouter from "./users/index.js";

const router = Router();

router.use("/transactions", transactionsRouter);
router.use("/categories", categoriesRouter);
router.use("/users", usersRouter);

export default router;