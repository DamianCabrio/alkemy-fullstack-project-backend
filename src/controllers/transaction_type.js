import { success } from '../helpers/responses.js';
import transactionTypeService from '../services/transaction_type.js';

class TransactionTypeController {
  async getTransactionType(req, res, next) {
    try {
      const transactionType = await transactionTypeService.getTransactionType(
        req.params.id
      );
      success(res, transactionType, 'Tipo de operación obtenido con éxito');
    } catch (err) {
      next(err);
    }
  }

  async getAllTransactionTypes(_req, res, next) {
    try {
      const transactionTypes = await transactionTypeService.getAllTransactionTypes();
      success(res, transactionTypes, 'Tipos de operación obtenidos con éxito');
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionTypeController();
