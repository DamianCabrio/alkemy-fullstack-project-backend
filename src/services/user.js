import '../helpers/loadEnv.js';

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userDAO from '../daos/user.js';
import ApiError from '../helpers/ApiError.js';
import { capitalize } from '../helpers/capitalizer.js';

const userNotFound = (user) => {
  if (!user) {
    throw ApiError.notFound();
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

class UserService {
  async register(user) {
    const { name, surname, email, password } = user;

    const hashedPassword = await hashPassword(password);

    return userDAO.createUser(
      capitalize(name),
      capitalize(surname),
      email,
      hashedPassword
    );
  }

  async login(email, password) {
    const user = await userDAO.getUserByEmail(email);

    userNotFound(user);

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw ApiError.unauthorized();
    }

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });

    return { user, token };
  }

  async updateUser(id, user) {
    const { name, surname } = user;
    const updatedUser = await userDAO.updateUser(id, name, surname);

    userNotFound(user);

    return updatedUser;
  }

  async updateUserPassword(id, password) {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await userDAO.updateUserPassword(id, hashedPassword);

    userNotFound(user);

    return updatedUser;
  }
}

export default new UserService();
