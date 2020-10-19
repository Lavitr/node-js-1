const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchError } = require('../../common/errorHandlers');

router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const user = await usersService.createUser(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      })
    );
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const user = await usersService.deletUser(req.params.id);
    res.json(User.toResponse(user));
  })
);

module.exports = router;
