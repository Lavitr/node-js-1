const { taskDB } = require('../../common/inMemoryDB');

const getAll = async () => {
  return taskDB;
};

const getTask = async (taskId, boardId) => {
  const user = taskDB.find(v => v.id === taskId && v.boardId === boardId);
  if (!user) {
    throw new Error(
      `The user with boardId=${boardId} and taskId=${taskId} was not found`
    );
  }
  return user;
};

const deletTask = async (taskId, boardId) => {
  const userInd = taskDB.findIndex(
    v => v.id === taskId && v.boardId === boardId
  );
  const user = taskDB.find(v => v.id === taskId && v.boardId === boardId);
  if (userInd < 0) {
    throw new Error(`The task with id=${taskId} was not found`);
  }
  taskDB.splice(userInd, 1);
  return user;
};

const createTask = async task => {
  taskDB.push(task);
  return getTask(task.id, task.boardId);
};

const updateTask = async (taskId, boardId, params) => {
  const task = await getTask(taskId, boardId);
  if (!task) {
    throw new Error(`The task with id=${taskId} was not found`);
  }
  const newTask = { ...task, ...params };
  taskDB.forEach((v, ind) => {
    if (v.id === taskId && v.boardId === boardId) {
      taskDB[ind] = newTask;
    }
  });
  return newTask;
};

const cleanUser = userId => {
  taskDB.forEach(v => {
    if (v.userId === userId) {
      v.userId = null;
    }
  });
};

const cleanBoard = async boardId => {
  let cloneTaskDB = taskDB.map(v => (v.boardId === boardId ? undefined : v));
  cloneTaskDB = cloneTaskDB.filter(Boolean);
  taskDB.length = cloneTaskDB.length;
  cloneTaskDB.forEach((v, i) => {
    taskDB[i] = v;
  });
};

module.exports = {
  getAll,
  getTask,
  deletTask,
  createTask,
  updateTask,
  cleanUser,
  cleanBoard
};
