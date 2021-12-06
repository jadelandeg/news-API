const {
  getUsers,
  getUserByUserName,
  patchUserInfo,
  postNewUser,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postNewUser);

usersRouter.route("/:username").get(getUserByUserName).patch(patchUserInfo);

module.exports = usersRouter;
