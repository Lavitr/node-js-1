const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const tasks = await taskService.getTask(
      req.params.taskId,
      req.params.boardId
    );
    res.json(tasks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.createTask(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.json(task);
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.taskId,
      req.params.boardId,
      req.body
    );
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const task = await taskService.deletTask(
      req.params.taskId,
      req.params.boardId
    );
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
