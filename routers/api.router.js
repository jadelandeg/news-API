const express = require("express").Router();
const topicsRouter = require("./topics.router");
const apiRouter = require("express").Router();
const articlesRouter = require("./articles.router");
const usersRouter = require("./users.router");
const { commentsRouter } = require("./comments.router");
const { getEndPoints } = require("../controllers/endpoints.controller");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.route("/").get(getEndPoints);

module.exports = apiRouter;
