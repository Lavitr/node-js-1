const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { catchError } = require('../../common/errorHandlers');

router.route('/').get(
  catchError(async (req, res) => {
    const tasks = await taskService.getAll();
    res.json(tasks);
  })
);

router.route('/:taskId').get(
  catchError(async (req, res) => {
    const tasks = await taskService.getTask(
      req.params.taskId,
      req.params.boardId
    );
    res.json(tasks);
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const task = await taskService.createTask(
      new Task({
        ...req.body,
        boardId: req.params.boardId
      })
    );
    res.json(task);
  })
);

router.route('/:taskId').put(
  catchError(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.taskId,
      req.params.boardId,
      req.body
    );
    res.json(task);
  })
);

router.route('/:taskId').delete(
  catchError(async (req, res) => {
    const task = await taskService.deletTask(
      req.params.taskId,
      req.params.boardId
    );
    res.json(task);
  })
);

module.exports = router;
