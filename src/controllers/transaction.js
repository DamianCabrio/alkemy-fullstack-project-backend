import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import transactionService from '../services/transaction.js';

class TransactionController {
  async createTransaction(req, res, next) {
    try {
      const id = await transactionService.createTransaction(req.body);
      res.status(201).json(success({ id }, 'Operación creada con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async getTransaction(req, res, next) {
    try {
      const transaction = await transactionService.getTransaction(
        req.params.id
      );

      res
        .status(200)
        .json(success(transaction, 'Operación obtenida con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async getAllTransactions(_req, res, next) {
    try {
      const transactions = await transactionService.getAllTransactions();
      res
        .status(200)
        .json(success(transactions, 'Operaciones obtenidas con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const transaction = await transactionService.updateTransaction(
        req.params.id,
        req.body
      );

      res
        .status(200)
        .json(success(transaction, 'Operación actualizada con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      await transactionService.deleteTransaction(req.params.id);
      res.status(200).json(success({}, 'Operación eliminada con éxito'));
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionController();
