const User = require('./user.model');
const { cleanUser } = require('../tasks/task.db.repository');

const getAll = async () => await User.find({});

const getById = async id => await User.findById(id).exec();

const createUser = async newUserData => User.create(newUserData);

const deletUser = async id => {
  await cleanUser(id);
  return await User.findByIdAndRemove(id);
};

const updateUser = async (id, params) => {
  return await User.findByIdAndUpdate(id, params);
};

module.exports = {
  getAll,
  getById,
  createUser,
  deletUser,
  updateUser
};
