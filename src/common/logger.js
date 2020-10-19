const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: path.join(__dirname, '/log/error.txt'),
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '/log/info.txt'),
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    })
  ]
});

const middlewareInfo = (req, res, next) => {
  const { url, method, body, query } = req;
  logger.log(
    'info',
    `URL: ${url}, METHOD: ${method}, BODY: ${JSON.stringify(
      body
    )}, QUERY: ${JSON.stringify(query)}`
  );
  next();
};

const middlewareError = (err, req, res, next) => {
  if (err) {
    logger.log('error', `${err.message}, CODE: ${err.statusCode}`);
  }
  next();
};

module.exports = { middlewareInfo, middlewareError, logger };
