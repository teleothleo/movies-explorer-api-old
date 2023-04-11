const { ERROR_CODE_BAD_REQUEST } = require('../config/config');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_BAD_REQUEST;
  }
};

module.exports = { ErrorBadRequest };
