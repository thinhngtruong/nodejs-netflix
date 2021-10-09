const { Router } = require("express");
const MovieController = require("../controllers/Movies.controller");
const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");
const AuthorizationMiddleware = require("../middleware/AuthorizationMiddleware");

const moviesRouter = Router({ mergeParams: true });

const moviesMiddleware = [
  AuthenticationMiddleware.isAuth,
  AuthorizationMiddleware.authorize(),
];

moviesRouter.post("/", moviesMiddleware, MovieController.create);
moviesRouter.get("/", MovieController.findAll);
moviesRouter.get("/:movieId", MovieController.findById);
moviesRouter.delete("/:movieId", moviesMiddleware, MovieController.deleteById);
moviesRouter.patch("/:movieId", moviesMiddleware, MovieController.updateById);

module.exports = moviesRouter;
