import { body } from 'express-validator';

import db from '../db/db.js';

class TransactionDAO {
  async createTransaction(description, amount, type, category_id, user_id) {
    const [id] = await db('transaction')
      .insert({
        description,
        amount,
        type,
        category_id,
        user_id,
      })
      .returning('id');

    return id;
  }

  async getTransaction(id, userId) {
    return db('transaction')
      .innerJoin('category', 'transaction.category_id', 'category.id')
      .where({ id, user_id: userId })
      .first();
  }

  async getUserTransactions(userId) {
    return db('transaction')
      .innerJoin('category', 'transaction.category_id', 'category.id')
      .where({ user_id: userId });
  }

  async updateTransaction(id, description, amount, category_id, userId) {
    return db('transaction').where({ id, user_id: userId }).update({
      description,
      amount,
      category_id,
    });
  }

  async deleteTransaction(id, userId) {
    return db('transaction').where({ id, user_id: userId }).del();
  }
}

export const validationSchema = [
  body('description')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('La descripción es requerida')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('La descripción debe tener entre 1 y 255 caracteres'),
  body('amount')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El monto es requerido')
    .bail()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('El monto debe ser un numero positivo'),
  body('category_id')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('La categoría es requerida')
    .bail()
    .toInt()
    .isInt({ min: 1 })
    .withMessage('La categoría debe ser un numero entero positivo')
    .custom(async (value) => {
      const category = await db('category').where({ id: value }).first();

      if (!category) {
        throw new Error('La categoría ingresada no existe');
      }
    }),
];

export const validationSchemaPost = [
  ...validationSchema,
  body('type')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El tipo de transacción es requerido')
    .bail()
    .toInt()
    .isIn([0, 1])
    .withMessage('El tipo ingresado no esta en el rango de valores permitidos'),
];

export default new TransactionDAO();
