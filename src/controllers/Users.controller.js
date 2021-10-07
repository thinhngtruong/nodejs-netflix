const bcrypt = require('bcrypt');

const jwtHelper = require('../helpers/JWT.helper');
const { isEmptyString } = require('../helpers/Validate.helper');
const userService = require('../services/Users.service');
const {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} = require('../config/JWT.config');

const create = async (req, res, next) => {
  const { username, password, email} = req.body;
  if (isEmptyString(username)) {
    return res.status(400).json({ message: 'Please not enter empty string username' });
  }
  if (isEmptyString(password)) {
    return res.status(400).json({ message: 'Please not enter empty string password' });
  }
  if (isEmptyString(email)) {
    return res.status(400).json({ message: 'Please not enter empty string username' });
  }
  try {
    const foundUserByUsername = await userService.findUserByUsername(username);
    const foundUserByEmail = await userService.findUserByEmail(email);
    if (foundUserByUsername) {
      res.status(400).json({ message: 'Username is existing' });
      return next();
    }
    if (foundUserByEmail) {
      res.status(400).json({ message: 'Email is existing' });
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return userService.createUser({
      username,
      password: hashPassword,
      email,
      profilePic: req.file ? req.file.path : undefined,
    })
      .then(async (user) => {
        const { password, ...userInfo } = user._doc;
        const accessToken = await jwtHelper.generateToken({ user: userInfo, isAdmin: user.isAdmin }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
        const refreshToken = await jwtHelper.generateToken({ user: userInfo, isAdmin: user.isAdmin }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);

        return res.status(200).json({ user: userInfo, accessToken, refreshToken });
      });
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const userList = await userService.getAllUsers();
    res.json(userList);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const findByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await userService.findUserByUsername(username);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.deleteUserById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateRoleByUsername = async (req, res, next) => {
  const { username } = req.params;
  const { roles } = req.body;
  if (roles)
    try {
      const user = await userService.findUserByUsername(username);
      await userService.setRolesForUser(user, roles);
      res.status(200).json({ message: 'Update role for user successfully' });
    } catch (err) {
      next(err);
    }
};

module.exports = {
  create,
  findAll,
  findById,
  findByUsername,
  deleteById,
  updateRoleByUsername
};