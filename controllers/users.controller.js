const {
  fetchUsers,
  fetchUserByUserName,
  checkIfUserExists,
  updateUserInfo,
  createNewUser,
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

exports.patchUserInfo = (req, res, next) => {
  const ID = req.params.username;
  const update = req.body.newName;

  Promise.all([updateUserInfo(ID, update), checkIfUserExists(ID)])
    .then(([response]) => {
      res.status(200).send({ user: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewUser = (req, res, next) => {
  const { username, name, avatar_url } = req.body;
  createNewUser(username, name, avatar_url)
    .then((response) => {
      res.status(201).send({ user: response });
    })
    .catch((err) => {
      next(err);
    });
};
