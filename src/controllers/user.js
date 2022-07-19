import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import userService from '../services/user.js';

class UserController {
  async register(req, res, next) {
    try {
      const id = await userService.register(req.body);
      res.status(201).json(success({ id }, 'Usuario creada con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body.email, req.body.password);
      res.status(200).json(success(user, 'Usuario autenticado con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);

      res.status(200).json(success(user, 'Usuario actualizada con éxito'));
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

      res.status(200).json(success(user, 'Contraseña actualizada con éxito'));
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
