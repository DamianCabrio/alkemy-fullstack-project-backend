import transactionDAO from '../daos/transaction.js';

class TransactionService {
  createTransaction(transaction) {
    const { description, amount, type } = transaction;
    return transactionDAO.createTransaction(description, amount, type);
  }

  async getTransaction(id) {
    const transaction = transactionDAO.getTransaction(id);
    if (!transaction) {
      throw new Error('No se encontró la operación');
    }
  }

  getAllTransactions() {
    return transactionDAO.getAllTransactions();
  }

  updateTransaction(id, transaction) {
    const { description, amount } = transaction;
    return transactionDAO.updateTransaction(id, description, amount);
  }

  deleteTransaction(id) {
    return transactionDAO.deleteTransaction(id);
  }
}

export default new TransactionService();