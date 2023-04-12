const { ErrorBadRequest } = require('../middleware/ErrorBadRequest');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const User = require('../models/user');

const getMe = async (req, res, next) => {
  console.log('getMe: ', req.user);
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new ErrorNotFound('Wrong user ID'));
      return;
    }
    console.log('updateUser: ', user);
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorBadRequest('Wrong keys or not all fiels are filled out'));
    } else {
      next(error);
    }
  }
};

module.exports = { getMe, updateUser };
