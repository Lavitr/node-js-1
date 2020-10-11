const { DB } = require('../../common/inMemoryDB');
const { cleanUser } = require('../tasks/task.memory.repository');

const getAll = async () => {
  return DB;
};

const getById = async id => {
  const user = DB.find(v => v.id === id);
  if (!user) {
    throw new Error(`The user with id=${id} was not found`);
  }
  return user;
};

const deletUser = async id => {
  cleanUser(id);
  const userInd = DB.findIndex(v => v.id === id);
  const user = DB.find(v => v.id === id);
  if (userInd < 0) {
    throw new Error(`The user with id=${id} was not found`);
  }
  DB.splice(userInd, 1);
  return user;
};

const createUser = async user => {
  DB.push(user);
  return getById(user.id);
};

const updateUser = async (id, params) => {
  const user = await getById(id);
  if (!user) {
    throw new Error(`The user with id=${id} was not found`);
  }
  const newUser = { ...user, ...params };
  DB.forEach((v, ind) => {
    if (v.id === id) {
      DB[ind] = newUser;
    }
  });
  return newUser;
};

module.exports = { getAll, getById, createUser, updateUser, deletUser };
