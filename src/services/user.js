import '../helpers/loadEnv.js';

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userDAO from '../daos/user.js';
import ApiError from '../helpers/ApiError.js';
import { capitalize } from '../helpers/capitalizer.js';

const userNotFound = (user) => {
  if (!user) {
    throw ApiError.notFound('El usuario no existe');
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const createJWT = (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
};

class UserService {
  async register(user) {
    const { name, surname, email, password } = user;

    const hashedPassword = await hashPassword(password);

    const id = await userDAO.createUser(
      capitalize(name),
      capitalize(surname),
      email,
      hashedPassword
    );

    const newUser = { id, name, surname, email, password };
    const token = createJWT(newUser);

    return { user: newUser, token };
  }

  async login(email, password) {
    const user = await userDAO.getUserByEmail(email);

    userNotFound(user);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw ApiError.unauthorized('Contraseña o email incorrectos');
    }

    delete user.password;
    const token = createJWT(user);

    return { user, token };
  }

  async updateUser(id, body, user) {
    const { name, surname } = body;
    await userDAO.updateUser(id, name, surname);

    const { email, id: userId, created_at, updated_at } = user;
    const updatedUser = {
      name,
      surname,
      email,
      id: userId,
      created_at,
      updated_at,
    };
    const token = createJWT(updatedUser);

    return { user: updatedUser, token };
  }

  async updateUserPassword(id, body) {
    const hashedPassword = await hashPassword(body.password);
    await userDAO.updateUserPassword(id, hashedPassword);
  }
}

export default new UserService();
