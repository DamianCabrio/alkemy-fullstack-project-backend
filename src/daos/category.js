import db from '../db/db.js';

class CategoryDAO {
  async getCategory(id) {
    return db('category').where({ id }).first();
  }

  async getAllCategories() {
    return db('category');
  }
}

export default new CategoryDAO();
