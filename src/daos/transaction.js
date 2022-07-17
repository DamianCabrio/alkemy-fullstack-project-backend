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
  body('type')
    .trim()
    .exists({ checkFalsy: true })
    .isIn(0, 1)
    .withMessage('El tipo de transacción ingresado es invalido'),
];

export default new TransactionDAO();
