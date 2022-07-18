import transactionDAO from '../daos/transaction.js';
import ApiError from '../helpers/ApiError.js';

class TransactionService {
  transactionNotFound(transaction) {
    if (!transaction) {
      throw ApiError.notFound();
    }
  }

  createTransaction(transaction) {
    const { description, amount, type } = transaction;
    return transactionDAO.createTransaction(description, amount, type);
  }

  async getTransaction(id) {
    const transaction = await transactionDAO.getTransaction(id);

    this.transactionNotFound(transaction);

    return transaction;
  }

  getAllTransactions() {
    return transactionDAO.getAllTransactions();
  }

  async updateTransaction(id, transaction) {
    const { description, amount } = transaction;
    const updatedTransaction = await transactionDAO.updateTransaction(
      id,
      description,
      amount
    );

    this.transactionNotFound(transaction);

    return updatedTransaction;
  }

  async deleteTransaction(id) {
    const transaction = await transactionDAO.deleteTransaction(id);

    this.transactionNotFound(transaction);

    return transaction;
  }
}

export default new TransactionService();
