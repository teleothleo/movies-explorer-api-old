const { ERROR_CODE_UNAUTHORIZED } = require('../config/config');

module.exports = class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_UNAUTHORIZED;
  }
};
