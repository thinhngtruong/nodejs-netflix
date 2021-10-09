const Movie = require('../models/Movie.model');

const getAllMovies = async () => {
  return Movie.find({});
};

const createMovie = async (newMovie) => {
  return Movie.create(newMovie);
};

const findMovieById = async (movieId) => {
  return Movie.findById(movieId);
};

const deleteMovieById = async (movieId) => {
  return Movie.findByIdAndRemove(movieId);
};

const updateMovieById = (movieID, movie) => {
  if (movie.completed) {
    movie.completedAt = new Date();
  }
  return Movie.findByIdAndUpdate(movieID, movie, { new: true });
};

module.exports = {
  createMovie,
  getAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
};