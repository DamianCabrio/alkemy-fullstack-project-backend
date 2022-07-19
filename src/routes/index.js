import { Router } from "express";
import transactionsRouter from "./transactions/index.js";
import categoriesRouter from "./categories/index.js";
import usersRouter from "./users/index.js";

const router = Router();

router.use("/users", usersRouter);

router.use("/transactions", transactionsRouter);
router.use("/categories", categoriesRouter);

export default router;