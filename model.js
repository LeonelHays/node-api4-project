
const { nanoid } = require('nanoid')

function getId() {
  return nanoid().slice(0, 5)
}

const initializeUsers = () => ([
  { id: getId(), name: 'leo', password: '1234567' },
  { id: getId(), name: 'boris', password: 'cheekibriki' },
])

let users = initializeUsers()

const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users)
}

const findById = id => {
  // SELECT * FROM users WHERE id = 1;
  const user = users.find(d => d.id === id)
  return Promise.resolve(user)
}

const insert = ({ name, password }) => {
  // INSERT INTO users (name, password) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, password }
  users.push(newUser)
  return Promise.resolve(newUser)
}

module.exports = {
    find,
    findById,
    insert,
}