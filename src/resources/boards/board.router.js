const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const boards = await boardService.getById(req.params.id);
    res.json(boards);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.createBoard(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const board = await boardService.deletBoard(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
