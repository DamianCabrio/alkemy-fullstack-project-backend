import TransactionTypeDAO from '../daos/transaction_type.js';
import ApiError from '../helpers/ApiError.js';

class TransactionTypeService {
  async getTransactionType(id) {
    const transactionType = await TransactionTypeDAO.getTransactionType(id);
    if (!transactionType) {
      throw ApiError.notFound();
    }

    return transactionType;
  }

  getAllTransactionTypes() {
    return TransactionTypeDAO.getAllTransactionTypes();
  }
}

export default new TransactionTypeService();
