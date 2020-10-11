const { boardDB } = require('../../common/inMemoryDB');
const { cleanBoard } = require('../tasks/task.memory.repository');

const getAll = async () => {
  return boardDB;
};

const getById = async id => {
  const user = boardDB.find(v => v.id === id);
  if (!user) {
    throw new Error(`The user with id=${id} was not found`);
  }
  return user;
};

const deletBoard = async id => {
  cleanBoard(id);
  const userInd = boardDB.findIndex(v => v.id === id);
  const user = boardDB.find(v => v.id === id);
  if (userInd < 0) {
    throw new Error(`The user with id=${id} was not found`);
  }
  boardDB.splice(userInd, 1);
  return user;
};

const createBoard = async user => {
  boardDB.push(user);
  return getById(user.id);
};

const updateBoard = async (id, params) => {
  const user = await getById(id);
  if (!user) {
    throw new Error(`The user with id=${id} was not found`);
  }
  const newUser = { ...user, ...params };
  boardDB.forEach((v, ind) => {
    if (v.id === id) {
      boardDB[ind] = newUser;
    }
  });
  return newUser;
};

module.exports = { getAll, getById, createBoard, updateBoard, deletBoard };
