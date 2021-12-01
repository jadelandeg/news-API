const endPoints = require("../endpoints.json");
console.log(endPoints);

exports.getEndPoints = () => {
  return endPoints;
};
