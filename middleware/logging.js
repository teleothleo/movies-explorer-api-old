const path = require('path');
const bunyan = require('bunyan');
const fs = require('fs');
const { ERROR_CODE_INTERNAL_SERVER_ERROR } = require('../config/config');

const initLogging = () => {
  const logDir = path.join(__dirname, 'logs');
  const requestLoggerFile = path.join(logDir, 'request.log');
  const errorLoggerFile = path.join(logDir, 'error.log');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  if (!fs.existsSync(requestLoggerFile)) {
    fs.writeFileSync(requestLoggerFile, '');
  }
  if (!fs.existsSync(errorLoggerFile)) {
    fs.writeFileSync(errorLoggerFile, '');
  }
};

const requestLogger = bunyan.createLogger({
  name: 'Request',
  streams: [{ path: './logs/request.log' }],
});
const errorLogger = bunyan.createLogger({
  name: 'Error',
  streams: [{ path: './logs/error.log' }],
});

const writeRequestLog = (req) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
};
const writeErrorLog = (req, message) => {
  errorLogger.error({
    error: message,
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
};

const logErrors = (err, req, res, next) => {
  console.log(err);
  const { statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR, message } = err;
  const errMessage = statusCode === ERROR_CODE_INTERNAL_SERVER_ERROR ? 'Server-side error' : message;
  res.status(statusCode).send({
    message: errMessage,
  });
  writeErrorLog(req, errMessage);
  next();
};

module.exports = {
  initLogging,
  requestLogger,
  errorLogger,
  writeRequestLog,
  writeErrorLog,
  logErrors,
};
