const endPoints = require("../endpoints.json");

exports.getEndPoints = (req, res) => {
  res.status(200).send(endPoints);
};
