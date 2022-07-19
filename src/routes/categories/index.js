import { Router } from 'express';
import categoryController from '../../controllers/category.js';
import authToken from '../../middlewares/authToken.js';

const router = Router();

router.use(authToken);

router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getAllCategories);

export default router;
