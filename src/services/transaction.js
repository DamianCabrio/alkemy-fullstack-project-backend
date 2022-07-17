import transactionDAO from '../daos/transaction.js';

class TransactionService {
  createTransaction(transaction) {
    const { description, amount, type } = transaction;
    return transactionDAO.createTransaction(description, amount, type);
  }
}

export default new TransactionService();