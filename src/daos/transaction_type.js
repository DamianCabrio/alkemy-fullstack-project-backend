import db from '../db/db.js';

class TransactionTypeDAO {
  async getTransactionType(id) {
    return db('transaction_type').where({ id }).first();
  }

  async getAllTransactionTypes() {
    return db('transaction_type');
  }
}

export default new TransactionTypeDAO();
