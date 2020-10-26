const taskService = require('./task.db.repository');

const getAll = id => taskService.getAll(id);

const getTask = (taskId, boardId) => taskService.getTask(taskId, boardId);

const createTask = task => taskService.createTask(task);

const updateTask = (taskId, boardId, params) =>
  taskService.updateTask(taskId, boardId, params);

const deletTask = (taskId, boardId) => taskService.deletTask(taskId, boardId);

module.exports = { getAll, getTask, createTask, updateTask, deletTask };
