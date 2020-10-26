const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { catchError, NotFoundError } = require('../../common/errorHandlers');

router.route('/').get(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:taskId').get(
  catchError(async (req, res, next) => {
    const task = await taskService.getTask(
      req.params.taskId,
      req.params.boardId
    );
    if (!task) return next(new NotFoundError('Not Found'));
    res.json(Task.toResponse(task));
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
    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').put(
  catchError(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.taskId,
      req.params.boardId,
      req.body
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  catchError(async (req, res, next) => {
    const task = await taskService.deletTask(
      req.params.taskId,
      req.params.boardId
    );
    if (!task) return next(new NotFoundError('Not Found'));
    res.json(Task.toResponse(task));
  })
);

module.exports = router;
