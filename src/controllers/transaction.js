import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import transactionService from '../services/transaction.js';

class TransactionController {
  async createTransaction(req, res, next) {
    try {
      const user_id = req.user.id;
      const id = await transactionService.createTransaction(req.body, user_id);
      const { description, amount, type, category_id } = req.body;
      res
        .status(201)
        .json(
          success(
            { id, description, amount, type, category_id, user_id },
            'Operación creada con éxito'
          )
        );
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async getTransaction(req, res, next) {
    try {
      const transaction = await transactionService.getTransaction(
        req.params.id,
        req.user.id
      );

      res
        .status(200)
        .json(success(transaction, 'Operación obtenida con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async getUserTransactions(req, res, next) {
    try {
      const transactions = await transactionService.getUserTransactions(
        req.user.id
      );
      res
        .status(200)
        .json(success(transactions, 'Operaciones obtenidas con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const transactionId = req.params.id;
      const userId = req.user.id;

      await transactionService.updateTransaction(
        transactionId,
        req.body,
        userId
      );

      const { description, amount, category_id } = req.body;
      res
        .status(200)
        .json(
          success(
            { id: transactionId, description, amount, category_id },
            'Operación actualizada con éxito'
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      await transactionService.deleteTransaction(req.params.id, req.user.id);
      res.status(200).json(success({}, 'Operación eliminada con éxito'));
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionController();
