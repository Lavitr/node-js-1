const Task = require('./task.model');

const getAll = async boardId => await Task.find({ boardId }).exec();

const createTask = async task => Task.create(task);

const getTask = async (taskId, boardId) =>
  await Task.findOne({ _id: taskId, boardId }).exec();

const deletTask = async (taskId, boardId) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
};

const deletBoardTasks = async boardId => {
  return await Task.deleteMany({ boardId });
};

const updateTask = async (taskId, boardId, params) => {
  return await Task.updateOne({ _id: taskId, boardId }, params).exec();
};

const cleanUser = async userId => {
  await Task.updateMany({ userId }, { $set: { userId: null } }).exec();
};

module.exports = {
  getAll,
  getTask,
  deletTask,
  createTask,
  updateTask,
  deletBoardTasks,
  cleanUser
};
