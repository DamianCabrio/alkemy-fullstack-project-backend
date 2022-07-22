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
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      success(res, user, 'Usuario actualizada con éxito');
    } catch (err) {
      next(err);
    }
  }

  async updateUserPassword(req, res, next) {
    try {
      const user = await userService.updateUserPassword(
        req.params.id,
        req.body
      );
      success(res, user, 'Contraseña actualizada con éxito');
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
