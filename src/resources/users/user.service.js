const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const createUser = user => usersRepo.createUser(user);

const updateUser = (id, params) => usersRepo.updateUser(id, params);

const deletUser = id => usersRepo.deletUser(id);

module.exports = { getAll, getById, createUser, updateUser, deletUser };
