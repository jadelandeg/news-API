const endPoints = require("../endpoints.json");
console.log(endPoints);

exports.getEndPoints = (req, res) => {
  res.status(200).send(endPoints);
};
