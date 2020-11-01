const usersRepo = require('./user.db.repository');
const bcrypt = require('bcrypt');
const DEFAULT_SAULT_ROUNDS = 10;

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const createUser = async user => {
  const { name, login, password } = user;
  const hashPassword = await bcrypt.hash(password, DEFAULT_SAULT_ROUNDS);
  return usersRepo.createUser({ name, login, password: hashPassword });
};

const updateUser = (id, params) => usersRepo.updateUser(id, params);

const deletUser = id => usersRepo.deletUser(id);

module.exports = { getAll, getById, createUser, updateUser, deletUser };
