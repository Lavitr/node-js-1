const router = require('express').Router();
const { signToken } = require('./login.server');
const { catchError, ErrorWithCode } = require('../common/errorHandlers');

router.route('/').post(
  catchError(async (req, res, next) => {
    const { login, password } = req.body;
    const token = await signToken(login, password);
    if (!token) {
      return next(new ErrorWithCode(403, 'Wrong login/password combination'));
    }
    res.status(200).json({ token });
  })
);

module.exports = router;
