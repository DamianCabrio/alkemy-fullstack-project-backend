import ApiError from '../helpers/ApiError.js';
import { success } from '../helpers/responses.js';
import userService from '../services/user.js';

class UserController {
  async createUser(req, res, next) {
    try {
      const id = await userService.createUser(req.body);
      res.status(201).json(success({ id }, 'Usuario creada con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);

      res.status(200).json(success(user, 'Usuario obtenida con éxito'));
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(_req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(success(users, 'Usuarios obtenidas con éxito'));
    } catch (err) {
      next(ApiError.internalServerError());
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

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json(success({}, 'Usuario eliminada con éxito'));
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
