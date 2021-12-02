const {
  fetchUsers,
  fetchUserByUserName,
  checkIfUserExists,
} = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((response) => {
      res.status(200).send({ users: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;
  Promise.all([fetchUserByUserName(username), checkIfUserExists(username)])
    .then(([response]) => {
      res.status(200).send({ user: response });
    })
    .catch((err) => {
      next(err);
    });
};
