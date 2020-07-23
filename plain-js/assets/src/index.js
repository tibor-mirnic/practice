import { UsersApi } from './users-api.js';
import { UsersApiAsync } from './users-api-async.js';

const users = Array.from({ length: 10 })
  .map((a, i) => {
    const id = i + 1;
    return {
      id: id,
      name: `User ${id}`
    }
  });


const api = new UsersApi();
const apiAsync = new UsersApiAsync();

// api.setUsers(users)
//   .then(message => console.log(message))
//   .catch(error => console.log(error));

const updateUsersInDom = (users) => {
  const el = document.getElementById('users');

  el.innerHTML = null;

  users.forEach(u => {
    const li = document.createElement('li');
    li.innerText = `
    id: ${u.id}
    name: ${u.name}
    `;

    li.addEventListener('click', e => {
      e.preventDefault();
      api.deleteUser(u)
        .then(message => {
          api.getUsers()
            .then(users => {
              updateUsersInDom(users);
              setTimeout(() => alert(message));
            });
        })
    });

    el.appendChild(li);
  });
}

// api.getUsers()
//   .then(users => updateUsersInDom(users));

const loadUsers = async () => {
  const users = await apiAsync.getUsers();
  updateUsersInDom(users);
};

loadUsers();


// Add new user
const bAdd = document.getElementById('add');
bAdd.addEventListener('click', e => {
  const id = Math.round(Math.random() * 1000000);
  const user = {
    id: id,
    name: `User ${id}`
  };

  api.addUser(user)
    .then(message => {
      api.getUsers()
        .then(users => {
          updateUsersInDom(users);
          setTimeout(() => alert(message));
        });
    });

  // Simplified
  // api.addUser(user)
  //   .then(message)
});