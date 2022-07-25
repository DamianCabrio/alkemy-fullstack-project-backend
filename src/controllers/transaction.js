import { StatusCodes } from 'http-status-codes';
import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import transactionService from '../services/transaction.js';

class TransactionController {
  async createTransaction(req, res, next) {
    try {
      const userId = parseInt(req.user.id);
      const id = await transactionService.createTransaction(req.body, userId);
      const { description, amount, type, date, category_id } = req.body;
      success(
        res,
        { id, description, amount, type, date, category_id, userId },
        'Operación creada con éxito',
        StatusCodes.CREATED
      );
    } catch (err) {
      next(err);
    }
  }

  async getTransaction(req, res, next) {
    try {
      const userId = parseInt(req.user.id);
      const transaction = await transactionService.getTransaction(
        req.params.id,
        userId
      );

      if (!transaction) {
        throw ApiError.notFound();
      }

      success(res, transaction, 'Operación obtenida con éxito');
    } catch (err) {
      next(err);
    }
  }

  async getUserTransactions(req, res, next) {
    try {
      const userId = parseInt(req.user.id);
      const { type, category, sort, search } = req.query;

      const queryObject = {};

      if (type && type !== 'all') {
        queryObject.type = type;
      }
      if (category && category !== 'all') {
        queryObject.category = category;
      }
      if (sort && (sort === 'asc' || sort === 'desc')) {
        queryObject.sort = sort;
      }
      if (search && search.trim() !== '') {
        queryObject.search = search.toLowerCase();
      }

      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const result = await transactionService.getUserTransactions(
        userId,
        queryObject,
        limit,
        offset
      );
      const { total, transactions } = result;
      const numOfPages = Math.ceil(total / limit);
      success(
        res,
        { transactions, total, numOfPages },
        'Operaciones obtenidas con éxito'
      );
    } catch (err) {
      next(err);
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const transactionId = req.params.id;
      const userId = parseInt(req.user.id);

      const result = await transactionService.updateTransaction(
        transactionId,
        req.body,
        userId
      );

      if (!result) {
        throw ApiError.forbidden();
      }

      const { description, amount, date, category_id } = req.body;
      success(
        res,
        { id: transactionId, description, date, amount, category_id },
        'Operación actualizada con éxito'
      );
    } catch (err) {
      next(err);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const userId = parseInt(req.user.id);
      const result = await transactionService.deleteTransaction(
        req.params.id,
        userId
      );

      if (!result) {
        throw ApiError.forbidden();
      }

      success(res, {}, 'Operación eliminada con éxito');
    } catch (err) {
      next(err);
    }
  }

  async showStats(req, res, next) {
    try {
      const userId = parseInt(req.user.id);
      const stats = await transactionService.showStats(userId);
      success(res, stats, 'Estadísticas obtenidas con éxito');
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionController();
