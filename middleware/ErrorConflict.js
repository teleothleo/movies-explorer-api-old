const { ERROR_CODE_CONFLICT } = require('../config/config');

module.exports = class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CONFLICT;
  }
};
