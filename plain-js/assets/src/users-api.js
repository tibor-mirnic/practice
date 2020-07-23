import { get, post } from './util/local-storage-api.js';

export class UsersApi {

  getUsers() {
    // return new Promise(resolve => {
    //   get('/users')
    //     .then(users => resolve(users));
    // });

    // simplified
    return get('/users');
  }

  setUsers(users) {
    // return new Promise((resolve, reject) => {
    //   post('/users', users)
    //     .then(message => resolve(message))
    //     .catch(error => reject(error));
    // })

    return post('/users', users);
  }

  addUser(user) {
    // return new Promise(resolve => {
    //   this.getUsers()
    //     .then(users => {
    //       users.push(user);

    //       this.setUsers(users)
    //         .then(message => resolve('User Added'))
    //     });
    // });

    // Promise chaning
    return this.getUsers()
      .then(users => {
        users.push(user);
        return this.setUsers(users);
      })
      .then(() => {
        return new Promise(resolve => resolve('User Added'));
      });
  }

  deleteUser(user) {
    return new Promise(resolve => {
      this.getUsers()
        .then(users => {
          users = users.filter(u => u.id !== user.id);

          this.setUsers(users)
            .then(message => resolve('User Deleted'))
        });
    });
  }
}