import { success, error } from '../helpers/responses.js';
import transactionService from '../services/transaction.js';

class TransactionController {
  async createTransaction(req, res) {
    try {
      const id = await transactionService.createTransaction(req.body);
      res.status(201).json(success({ id }, 'Operación creada con éxito'), 201);
    } catch (err) {
      res
        .status(500)
        .json(
          error(
            'Ocurrió un error al crear la operación, por favor vuelva a intentarlo'
          )
        );
    }
  }

  async getTransaction(req, res) {
    try {
      const transaction = await transactionService.getTransaction(
        req.params.id
      );
      res
        .status(200)
        .json(success(transaction, 'Operación obtenida con éxito'));
    } catch (err) {
      res.status(500).json(error('Ocurrió un error al obtener la operación'));
    }
  }

  async getAllTransactions(_req, res) {
    try {
      const transactions = await transactionService.getAllTransactions();
      res
        .status(200)
        .json(success(transactions, 'Operaciones obtenidas con éxito'));
    } catch (err) {
      res
        .status(500)
        .json(
          error(
            'Ocurrió un error al obtener las operación, por favor vuelva a intentarlo'
          )
        );
    }
  }

  async updateTransaction(req, res) {
    try {
      const transaction = await transactionService.updateTransaction(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json(success(transaction, 'Operación actualizada con éxito'));
    } catch (err) {
      res
        .status(500)
        .json(
          error(
            'Ocurrió un error al actualizar la operación, por favor vuelva a intentarlo'
          )
        );
    }
  }

  async deleteTransaction(req, res) {
    try {
      await transactionService.deleteTransaction(req.params.id);
      res.status(200).json(success({}, 'Operación eliminada con éxito'));
    } catch (err) {
      res
        .status(500)
        .json(
          error(
            'Ocurrió un error al eliminar la operación, por favor vuelva a intentarlo'
          )
        );
    }
  }
}

export default new TransactionController();
