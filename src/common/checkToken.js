const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { ErrorWithCode } = require('./errorHandlers');

const checkToken = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      return next(new ErrorWithCode(401, 'Unauthorized'));
    }
    await jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    return next(new ErrorWithCode(401, 'Unauthorized'));
  }
};

module.exports = { checkToken };
