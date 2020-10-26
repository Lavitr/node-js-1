const Board = require('./board.model');
const { deletBoardTasks } = require('../tasks/task.db.repository');

const getAll = async () => await Board.find({});

const getById = async id => await Board.findById(id).exec();

const createBoard = async board => Board.create(board);

const deletBoard = async id => {
  const isDeleted = (await Board.deleteOne({ _id: id })).deletedCount;

  if (isDeleted) {
    await deletBoardTasks(id);
  }
  return isDeleted;
};

const updateBoard = async (id, params) => {
  const boardForDB = Board.toDB(id, params);
  const board = await Board.findOneAndUpdate({ _id: id }, boardForDB, {
    new: true
  }).exec();

  return board;
};

module.exports = { getAll, getById, createBoard, deletBoard, updateBoard };
