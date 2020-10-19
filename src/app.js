const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { middlewareInfo, middlewareError, logger } = require('./common/logger');
const { errorHandler } = require('./common/errorHandlers.js');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();

process
  .on('uncaughtException', err => {
    logger.log('error', `${err.message}`);
    // eslint-disable-next-line no-process-exit
    logger.on('finish', () => process.exit(1));
  })
  .on('unhandledRejection', async reason => {
    logger.log('error', `${reason.message}`);
    // eslint-disable-next-line no-process-exit
    logger.on('finish', () => process.exit(1));
  });

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(middlewareInfo);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);
app.use(middlewareError);

//* ******  for check 'uncaughtException' uncomment lines below

// setInterval(() => {
//   console.log('working');
// }, 1000);
// setInterval(() => {
//   throw Error('Oops uncaughtException!');
// }, 2500);

//* ****** for check 'unhandledRejection' uncomment lines below

// setInterval(() => {
//   console.log('working');
// }, 1000);
// setInterval(() => {
//   Promise.reject(new Error('Oops! unhandledRejection'));
// }, 2500);

module.exports = app;
