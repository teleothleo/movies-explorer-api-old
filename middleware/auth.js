const jwt = require('jsonwebtoken');
const ErrorForbidden = require('./ErrorForbidden');

const { NODE_ENV, JWT_SECRET } = process.env;

const tokenCheck = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization.startsWith('Bearer')) {
      console.log('tokenCheck: ', req.headers.authorization);
      return;
    }
    // console.log('auth.js: ', req.headers);
    const token = authorization.split('Bearer ')[1];
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // console.log('auth.js', token);
    req.user = payload;
    next();
  } catch (err) {
    next(new ErrorForbidden('Bad Token.'));
  }
};

module.exports = tokenCheck;
