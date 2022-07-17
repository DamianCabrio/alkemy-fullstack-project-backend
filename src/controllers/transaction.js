import { success, error } from '../helpers/responses.js';
import transactionService from '../services/transaction.js';

class TransactionController {
  async createTransaction(req, res) {
    try {
      const id = await transactionService.createTransaction(req.body);
      res.status(201).json(success({ id }, 'Transaction created'), 201);
    } catch (err) {
      res.status(500).json(error("Ocurrió un error al crear la transacción, por favor vuelva a intentarlo"));
    }
  }

  getTransaction(req, res) {}

  getAllTransactions(req, res) {}

  updateTransaction(req, res) {}

  deleteTransaction(req, res) {}
}

export default new TransactionController();
