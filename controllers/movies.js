const { ErrorBadRequest } = require('../middleware/ErrorBadRequest');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const ErrorForbidden = require('../middleware/ErrorForbidden');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    console.log('createMovie: ', movie);
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(err);
      next(new ErrorBadRequest('Incorrect data passed.'));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieId = await Movie.findById(req.params._id);
    console.log('deleteMovie: ', movieId);
    if (!movieId) {
      next(new ErrorNotFound('Movie not found.'));
      return;
    }
    if (movieId.owner.toString() !== req.user._id) {
      next(new ErrorForbidden('You may only remove your own movies.'));
      return;
    }

    try {
      const result = await Movie.deleteOne({ _id: movieId });
      console.log(result);
      res.send({ message: 'Movie was deleted successfully.' });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ErrorBadRequest('Incorrect id passed.'));
      return;
    }
    next(error);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
