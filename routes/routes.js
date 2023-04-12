const router = require('express').Router();
const { signIn, signUp, signOut } = require('../controllers/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { getMe, updateUser } = require('../controllers/users');
const tokenCheck = require('../middleware/auth');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const { writeErrorLog } = require('../middleware/logging');
const { validateGetMovie } = require('../middleware/validation-url');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

router.patch('/404', (req, res, next) => {
  writeErrorLog(req, '/404 route invoked.');
  next(new ErrorNotFound('Lost your way?'));
});

router.use(tokenCheck);

router.get('/users/me', getMe);
router.patch('/users/me', updateUser);

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', validateGetMovie, deleteMovie);

router.use('*', (req, res, next) => {
  writeErrorLog(req, 'Unknown route invoked.');
  const errorNotFound = new ErrorNotFound('Lost your way?');
  next(errorNotFound);
});

module.exports = router;
