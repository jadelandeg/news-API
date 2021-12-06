const app = require("../app");

exports.handle400BadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};
exports.handleCustoms = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handle23503BadRequest = (err, req, res, next) => {
  if (err.code === "23503") {
    if (err.constraint === "comments_article_id_fkey") {
      res.status(404).send({ msg: "article doesn't exist" });
    } else if (err.constraint === "comments_author_fkey") {
      res.status(404).send({ msg: "user doesn't exist" });
    }
  } else next(err);
};

exports.hand23505Errors = (err, req, res, next) => {
  if (err.code === "23505") {
    res.status(400).send({ msg: "user already exists" });
  }
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
