import '../helpers/loadEnv.js';

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userDAO from '../daos/user.js';
import ApiError from '../helpers/ApiError.js';
import { capitalize } from '../helpers/capitalizer.js';

class UserService {
  userNotFound(user) {
    if (!user) {
      throw ApiError.notFound();
    }
  }

  register(user) {
    const { name, surname, email, password } = user;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return userDAO.createUser(
      capitalize(name),
      capitalize(surname),
      email,
      hash
    );
  }

  async login(email, password) {
    const user = await userDAO.getUserByEmail(email);

    this.userNotFound(user);

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw ApiError.unauthorized();
    }

    delete user.password;

    user.token = jwt.sign(user, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
    
    return user;
  }

  async updateUser(id, user) {
    const { name, surname } = user;
    const updatedUser = await userDAO.updateUser(id, name, surname);

    this.userNotFound(user);

    return updatedUser;
  }

  async updateUserPassword(id, password) {
    const updatedUser = await userDAO.updateUserPassword(id, password);

    this.userNotFound(user);

    return updatedUser;
  }
}

export default new UserService();
