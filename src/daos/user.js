import { body } from 'express-validator';

import db from '../db/db.js';

class UserDAO {
  async createUser(name, surname, email, password) {
    const [id] = await db('user')
      .insert({
        name,
        surname,
        email,
        password,
      });

    return id;
  }

  async getUserByEmail(email) {
    return db('user').where({ email }).first();
  }

  async updateUser(id, name, surname) {
    return db('user').where({ id }).update({
      name,
      surname,
    });
  }

  async updateUserPassword(id, password) {
    return db('user').where({ id }).update({
      password,
    });
  }
}

export const validationSchemaPassword = [
  body('password')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es requerida')
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      'La contraseña ingresada es invalida, debe tener al menos 8 caracteres'
    ),
];

export const validationSchema = [
  body('name')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El nombre es requerido')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre ingresado es invalido'),
  body('surname')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El apellido es requerido')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('El apellido ingresado es invalido'),
  ...validationSchemaPassword,
];

export const validationSchemaPost = [
  ...validationSchema,
  body('email')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El email es requerido')
    .bail()
    .isEmail()
    .withMessage('El email ingresado es invalido')
    .bail()
    .custom(async (value) => {
      const user = await db('user').where({ email: value }).first();
      if (user) {
        throw new Error('El email ingresado ya existe');
      }
    }),
];

export const validationSchemaLogin = [
  ...validationSchemaPassword,
  body('email')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('El email es requerido')
    .bail()
    .isEmail()
    .withMessage('El email ingresado es invalido'),
];

export default new UserDAO();
