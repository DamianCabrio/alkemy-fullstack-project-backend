import transactionDAO from '../daos/transaction.js';
import ApiError from '../helpers/ApiError.js';

class TransactionService {
  createTransaction(transaction) {
    const { description, amount, type } = transaction;
    return transactionDAO.createTransaction(description, amount, type);
  }

  async getTransaction(id) {
    const transaction = await transactionDAO.getTransaction(id);

    if (!transaction) {
      throw ApiError.notFound();
    }

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

    if (!updatedTransaction) {
      throw ApiError.notFound();
    }

    return updatedTransaction;
  }

  async deleteTransaction(id) {
    const transaction = await transactionDAO.deleteTransaction(id);

    if (!transaction) {
      throw ApiError.notFound();
    }

    return transaction;
  }
}

export default new TransactionService();
