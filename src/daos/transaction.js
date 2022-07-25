import { body } from 'express-validator';

import db from '../db/db.js';

class TransactionDAO {
  async createTransaction(
    description,
    amount,
    type,
    date,
    category_id,
    user_id
  ) {
    const [id] = await db('transaction').insert({
      description,
      amount,
      type,
      date,
      category_id,
      user_id,
    });

    return id;
  }

  async getTransaction(id, userId) {
    return db('transaction')
      .innerJoin('category', 'transaction.category_id', '=', 'category.id')
      .innerJoin(
        'transaction_type',
        'transaction.type',
        '=',
        'transaction_type.id'
      )
      .select(
        'transaction.*',
        'category.name as category_name',
        'transaction_type.name as type_name'
      )
      .where({ 'transaction.id': id, user_id: userId })
      .first();
  }

  async getUserTransactions(userId, filters, limit, offset) {
    const { type, category, sort, search } = filters;

    const query = db('transaction')
      .innerJoin('category', 'transaction.category_id', '=', 'category.id')
      .innerJoin(
        'transaction_type',
        'transaction.type',
        '=',
        'transaction_type.id'
      )
      .where({ user_id: userId });

    if (type) {
      query.where({ type });
    }
    if (category) {
      query.where({ category_id: category });
    }
    if (search) {
      query.whereRaw(`LOWER(description) LIKE ?`, [`%${search}%`]);
    }
    if (sort) {
      query.orderBy('date', sort);
    } else {
      query.orderBy('date', 'desc');
    }

    const totalCount = await query.clone().count('* as total').first();
    const transactions = await query
      .limit(limit)
      .offset(offset)
      .select(
        'transaction.*',
        'category.name as category_name',
        'transaction_type.name as type_name'
      );

    return {total: totalCount.total, transactions};
  }

  async updateTransaction(id, description, amount, date, category_id, userId) {
    return db('transaction').where({ id, user_id: userId }).update({
      description,
      amount,
      date,
      category_id,
    });
  }

  async deleteTransaction(id, userId) {
    return db('transaction').where({ id, user_id: userId }).del();
  }

  async showStats(userId) {
    const groupByType = await db.raw(
      `SELECT COALESCE(COUNT(t.id),0) as total, COALESCE(SUM(t.amount),0) as total_amount, tt.name, tt.id
      FROM transaction t 
      RIGHT JOIN transaction_type tt on t.type = tt.id
      WHERE t.user_id = ? OR t.user_id IS NULL
      GROUP BY tt.id;`,
      [userId]
    );

    const groupByCategory = await db.raw(
      `SELECT COALESCE(COUNT(t.id),0) as total, COALESCE(SUM(t.amount),0) as total_amount, c.name, c.id
      FROM transaction t 
      RIGHT JOIN category c on t.category_id = c.id
      WHERE t.user_id = ? OR t.user_id IS NULL
      GROUP BY c.id;`,
      [userId]
    );

    const groupByLastSixMonths = await db.raw(
      `SELECT COALESCE(COUNT(t.id),0) as total, COALESCE(SUM(t.amount),0) as total_amount, MONTH(t.date) as month, YEAR(t.date) as year
      FROM transaction t
      WHERE t.user_id = ? OR t.user_id IS NULL
      GROUP BY MONTH(t.date), YEAR(t.date)
      ORDER BY YEAR(t.date) ASC, MONTH(t.date) ASC
      LIMIT 6;`,
      [userId]
    );

    return {
      groupByType: groupByType[0],
      groupByCategory: groupByCategory[0],
      groupByLastSixMonths: groupByLastSixMonths[0],
    };
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
    .isFloat({ min: 1 })
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
  body('date')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('La fecha es requerida')
    .bail()
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida'),
];

export const validationSchemaPost = [
  ...validationSchema,
  body('type')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El tipo de transacción es requerido')
    .bail()
    .toInt()
    .isInt({ min: 1 })
    .withMessage('El tipo de transacción debe ser un numero entero positivo')
    .custom(async (value) => {
      const type = await db('transaction_type').where({ id: value }).first();

      if (!type) {
        throw new Error('El tipo de transacción ingresado no existe');
      }
    }),
];

export default new TransactionDAO();
