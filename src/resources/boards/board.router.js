const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { catchError } = require('../../common/errorHandlers');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const boards = await boardService.getById(req.params.id);
    res.json(boards);
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const board = await boardService.createBoard(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );
    res.json(board);
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const board = await boardService.deletBoard(req.params.id);
    res.json(board);
  })
);

module.exports = router;
