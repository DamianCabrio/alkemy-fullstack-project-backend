import db from '../db/db.js';

class TransactionDAO {
  async createTransaction(description, amount, type) {
    const [id] = await db('transaction')
      .insert({
        description,
        amount,
        type,
      })
      .returning('id');

    return id;
  }
}

export default new TransactionDAO();
