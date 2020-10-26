const boardService = require('./board.db.repository');

const getAll = () => boardService.getAll();

const getById = id => boardService.getById(id);

const createBoard = user => boardService.createBoard(user);

const updateBoard = (id, params) => boardService.updateBoard(id, params);

const deletBoard = id => boardService.deletBoard(id);

module.exports = { getAll, getById, createBoard, updateBoard, deletBoard };
