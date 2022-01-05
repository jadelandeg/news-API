const express = require("express");
const {
  handle400BadRequest,
  handle23503BadRequest,
  handleCustoms,
  handle500Errors,
  hand23505Errors,
} = require("./errors/error.handling");
const app = express();
const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(200).send("welcome to my news API");
});

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(handle400BadRequest);
app.use(handleCustoms);
app.use(handle23503BadRequest);
app.use(hand23505Errors);
app.use(handle500Errors);

module.exports = app;
