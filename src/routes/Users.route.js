const { Router } = require('express');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');
// const AuthorizationMiddleware = require('../middleware/AuthorizationMiddleware');
const UploadMiddleware = require('../middleware/UploadMiddleware');
const userController = require('../controllers/Users.controller');

const userRouter = Router({ mergeParams: true });

userRouter.post('/', UploadMiddleware.single('profilePic'), userController.create);
userRouter.get('/', userController.findAll);
userRouter.patch('/:username',
  [AuthenticationMiddleware.isAuth],
  userController.updateRoleByUsername);
userRouter.get('/:username',
  [AuthenticationMiddleware.isAuth],
  userController.findByUsername);
userRouter.get('/:userId',
  [AuthenticationMiddleware.isAuth],
  userController.findById);
userRouter.delete('/:userId',
  [AuthenticationMiddleware.isAuth],
  userController.deleteById);

module.exports = userRouter;
