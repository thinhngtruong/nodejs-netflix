const User = require('../models/User.model');

const createUser = async ({ username, password, email, profilePic }) => {
  return User.create({
    username,
    password,
    email,
    profilePic
  });
};

const findUserByUsername = async (username) => {
  return User.findOne({ username: username }, '-password');
};

const findUserByEmail = async (email) => {
  return User.findOne({ email: email }, '-password');
};

const getAllUsers = async () => {
  return User.find({}, '-password');
};

const findUserById = async (userId) => {
  return User.findById(userId, '-password');
};

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId)
      .then((user) => {
        if (user)
          resolve(user);
        else
          reject('User doesn\'t exist.');
      })
      .catch((error) => reject(error));
  });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUserById,
  findUserByUsername,
  findUserByEmail,
  findUserById
};