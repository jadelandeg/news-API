const app = require("../app");

exports.handle400BadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};

exports.handle23503BadRequest = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "article doesn't exist" });
  }
};

exports.handleCustoms = (err, req, res, next) => {
  if (err.status) {
    console.log("err");
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
