const {
  getUsers,
  getUserByUserName,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByUserName);

module.exports = usersRouter;
