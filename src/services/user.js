import bcrypt from 'bcrypt';

import userDAO from '../daos/user.js';
import ApiError from '../helpers/ApiError.js';

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

    return userDAO.createUser(name, surname, email, hash);
  }

  async login(email, password) {
    const user = await userDAO.getUserByEmail(email);

    this.userNotFound(user);

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      throw ApiError.unauthorized();
    }

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
