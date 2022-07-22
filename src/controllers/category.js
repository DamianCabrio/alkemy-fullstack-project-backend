import { success } from '../helpers/responses.js';
import categoryService from '../services/category.js';

class CategoryController {
  async getCategory(req, res, next) {
    try {
      const category = await categoryService.getCategory(req.params.id);
      success(res, category, 'Categoría obtenida con éxito');
    } catch (err) {
      next(err);
    }
  }

  async getAllCategories(_req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      success(res, categories, 'Categorías obtenidas con éxito');
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
