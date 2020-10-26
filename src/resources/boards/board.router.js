const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { catchError, NotFoundError } = require('../../common/errorHandlers');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const board = await boardService.getById(req.params.id);
    if (!board) return next(new NotFoundError('Not Found'));
    res.json(Board.toResponse(board));
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
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const board = await boardService.deletBoard(req.params.id);
    if (!board) return next(new NotFoundError('Not Found'));
    return res.status(204).json('The board deleted');
  })
);

module.exports = router;
