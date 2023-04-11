const router = require('express').Router();
const { signIn, signUp, signOut } = require('../controllers/auth');
const tokenCheck = require('../middleware/auth');
const ErrorNotFound = require('../middleware/ErrorNotFound');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

router.use(tokenCheck);

router.get('/users/me');
router.patch('/users/me');

router.get('/movies');
router.post('/movies');
router.delete('/movies/:_id');

router.use('*', (req, res, next) => {
  const errorNotFound = new ErrorNotFound('Lost your way?');
  next(errorNotFound);
});

module.exports = router;
