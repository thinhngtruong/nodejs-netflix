const User = require('../models/User.model');

const findUserByUsername = async (username) => {
  return User.findOne({ username }).populate('roles', 'name');
};

module.exports = {
  findUserByUsername,
};