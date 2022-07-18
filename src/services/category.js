import categoryDAO from '../daos/category.js';
import ApiError from '../helpers/ApiError.js';

class CategoryService {
  async getCategory(id) {
    const category = await categoryDAO.getCategory(id);

    if (!category) {
      throw ApiError.notFound();
    }

    return category;
  }

  getAllCategories() {
    return categoryDAO.getAllCategories();
  }
}

export default new CategoryService();
