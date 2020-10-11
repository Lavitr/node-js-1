const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');

const DB = [];

DB.push(new User(), new User(), new User());

const boardDB = [];
boardDB.push(new Board(), new Board(), new Board());

const taskDB = [];
taskDB.push(new Task(), new Task(), new Task());

module.exports = { DB, taskDB, boardDB };
