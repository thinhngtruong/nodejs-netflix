const { Router } = require('express');
const AuthController = require('../controllers/Auth.controller');
const UserController = require('../controllers/Users.controller');

const authRouter = Router({ mergeParams: true });

authRouter.post('/register', UserController.create);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh-token', AuthController.refreshToken);

module.exports = authRouter;
