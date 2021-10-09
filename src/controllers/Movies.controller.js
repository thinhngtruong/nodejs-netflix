const movieService = require("../services/Movies.service");

const create = async (req, res, next) => {
  try {
    const newMovie = await movieService.createMovie(req.body);
    res.json(newMovie);
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await movieService.findMovieById(movieId);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await movieService.deleteMovieById(movieId);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = req.body;
  try {
    const updatedMovie = await movieService.updateMovieById(movieId, movie);
    res.json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
};
