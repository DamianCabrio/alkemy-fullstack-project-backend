import { body } from 'express-validator';

import db from '../db/db.js';

class TransactionDAO {
  async createTransaction(description, amount, type) {
    const [id] = await db('transaction')
      .insert({
        description,
        amount,
        type,
      })
      .returning('id');

    return id;
  }

  async getTransaction(id) {
    return db('transaction').where({ id }).first();
  }

  async getAllTransactions() {
    return db('transaction');
  }

  async updateTransaction(id, description, amount) {
    return db('transaction')
      .where({ id })
      .update({
        description,
        amount,
      })
      .returning('*');
  }

  async deleteTransaction(id) {
    return db('transaction').where({ id }).del();
  }
}

export const validationSchema = [
  body('description')
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 255 })
    .withMessage('La descripción ingresada es invalida'),
  body('amount')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El monto ingresado es invalido')
    .bail()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('El monto debe ser un numero positivo'),
];


export const validationSchemaPost = [
  ...validationSchema,
  body('type')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El tipo ingresado es invalido')
    .bail()
    .toInt()
    .isIn([0, 1])
    .withMessage('El tipo ingresado no esta en el rango de valores permitidos'),
];

export default new TransactionDAO();
