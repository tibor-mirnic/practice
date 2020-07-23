import { get, post } from './util/local-storage-api.js';

export class UsersApiAsync {
  async getUsers() {
    try {
      const users = await get('/users');
      return users;
    }
    catch (error) {
      console.log(error);
    }
  }

  async setUsers(users) {
    try {
      await post('/users', users);
    }
    catch (error) {
      console.log(error);
    }
  }

  async addUser(user) {
    try {
      const users = await this.getUsers();
      users.push(user);
      await this.setUsers(users);

      return 'User Added';
    }
    catch (error) {
      console.log(error);
    }
  }

  async deleteUser(user) {
    try {
      const users = await this.getUsers();
      users = users.filter(u => u.id !== user.id);
      await this.setUsers(users);

      return 'User Deleted';
    }
    catch (error) {
      console.log(error);
    }
  }
}