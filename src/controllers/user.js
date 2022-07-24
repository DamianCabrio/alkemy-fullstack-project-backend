import { StatusCodes } from 'http-status-codes';

import { success } from '../helpers/responses.js';
import userService from '../services/user.js';

class UserController {
  async register(req, res, next) {
    try {
      const user = await userService.register(req.body);
      success(res, user, 'Usuario creado con éxito', StatusCodes.CREATED);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body.email, req.body.password);
      success(res, user, 'Usuario autenticado con éxito');
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    const userId = parseInt(req.user.id);
    try {
      const result = await userService.updateUser(userId, req.body, req.user);
      success(res, result, 'Usuario actualizada con éxito');
    } catch (err) {
      next(err);
    }
  }

  async updateUserPassword(req, res, next) {
    const userId = parseInt(req.user.id);
    try {
      await userService.updateUserPassword(userId, req.body);
      success(res, {}, 'Contraseña actualizada con éxito');
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
