import transactionDAO from '../daos/transaction.js';
import ApiError from '../helpers/ApiError.js';

class TransactionService {
  transactionNotFound(transaction) {
    if (!transaction) {
      throw ApiError.notFound();
    }
  }

  createTransaction(transaction, userId) {
    const { description, amount, type, date, category_id } = transaction;
    return transactionDAO.createTransaction(
      description,
      amount,
      type,
      date,
      category_id,
      userId,
    );
  }

  async getTransaction(id, userId) {
    const transaction = await transactionDAO.getTransaction(id, userId);

    this.transactionNotFound(transaction);

    return transaction;
  }

  getUserTransactions(userId) {
    return transactionDAO.getUserTransactions(userId);
  }

  async updateTransaction(id, transaction, userId) {
    const { description, amount, date, category_id } = transaction;
    const updatedTransaction = await transactionDAO.updateTransaction(
      id,
      description,
      amount,
      date,
      category_id,
      userId
    );

    this.transactionNotFound(transaction);

    return updatedTransaction;
  }

  async deleteTransaction(id, userId) {
    const transaction = await transactionDAO.deleteTransaction(id, userId);

    this.transactionNotFound(transaction);

    return transaction;
  }
}

export default new TransactionService();
