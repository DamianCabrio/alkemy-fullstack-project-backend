import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import categoryService from '../services/category.js';

class CategoryController {
  async getCategory(req, res, next) {
    try {
      const category = await categoryService.getCategory(
        req.params.id
      );

      res
        .status(200)
        .json(success(category, 'Categoría obtenida con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async getAllCategories(_req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      res
        .status(200)
        .json(success(categories, 'Categorías obtenidas con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }
}

export default new CategoryController();
