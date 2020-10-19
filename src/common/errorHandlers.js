const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const errorHandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    res.status(err.statusCode).send(err.message);
    return;
  }
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });

  return next(err);
};

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = { catchError, errorHandler, NotFoundError };
