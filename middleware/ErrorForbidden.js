const { ERROR_CODE_FORBIDDEN } = require('../config/config');

module.exports = class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_FORBIDDEN;
  }
};
