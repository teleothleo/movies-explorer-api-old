const router = require('express').Router();
const { signIn, signUp, signOut } = require('../controllers/auth');
const tokenCheck = require('../middleware/auth');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const { writeErrorLog } = require('../middleware/logging');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

router.patch('/404', (req, res, next) => {
  writeErrorLog(req, '/404 route invoked.');
  next(new ErrorNotFound('Lost your way?'));
});

router.use(tokenCheck);

router.get('/users/me');
router.patch('/users/me');

router.get('/movies');
router.post('/movies');
router.delete('/movies/:_id');

router.use('*', (req, res, next) => {
  writeErrorLog(req, 'Unknown route invoked.');
  const errorNotFound = new ErrorNotFound('Lost your way?');
  next(errorNotFound);
});

module.exports = router;
