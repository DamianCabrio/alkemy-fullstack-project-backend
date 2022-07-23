import { Router } from 'express';
import categoryController from '../../controllers/category.js';

const router = Router();

router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getAllCategories);

export default router;
