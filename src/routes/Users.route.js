const { Router } = require("express");
const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");
const AuthorizationMiddleware = require("../middleware/AuthorizationMiddleware");
const UploadMiddleware = require("../middleware/UploadMiddleware");
const userController = require("../controllers/Users.controller");

const userRouter = Router({ mergeParams: true });

const usersMiddleware = [
  AuthenticationMiddleware.isAuth,
  AuthorizationMiddleware.authorize(),
];

userRouter.post(
  "/",
  UploadMiddleware.single("profilePic"),
  userController.create
);
userRouter.get("/", usersMiddleware, userController.findAll);
userRouter.get("/:username", usersMiddleware, userController.findByUsername);
userRouter.get("/:userId", usersMiddleware, userController.findById);
userRouter.delete("/:userId", usersMiddleware, userController.deleteById);

module.exports = userRouter;
