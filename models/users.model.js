const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`SELECT username FROM users`).then((response) => {
    return response.rows;
  });
};

exports.checkIfUserExists = (username) => {
  return db
    .query("SELECT * FROM users WHERE username  = $1;", [username])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "user doesn't exist" });
      }
    });
};

exports.fetchUserByUserName = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((response) => {
      return response.rows[0];
    });
};
