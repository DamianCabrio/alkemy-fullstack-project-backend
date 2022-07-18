import userDAO from '../daos/user.js';
import ApiError from '../helpers/ApiError.js';

class UserService {
  userNotFound(user) {
    if (!user) {
      throw ApiError.notFound();
    }
  }

  createUser(user) {
    const { name, surname, email, password } = user;
    return userDAO.createUser(name, surname, email, password);
  }

  async getUser(id) {
    const user = await userDAO.getUser(id);

    this.userNotFound(user);

    return user;
  }

  getAllUsers() {
    return userDAO.getAllUsers();
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

  async deleteUser(id) {
    const user = await userDAO.deleteUser(id);

    this.userNotFound(user);

    return user;
  }
}

export default new UserService();
