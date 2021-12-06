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

exports.updateUserInfo = (ID, update) => {
  if (!update) {
    return db
      .query(`SELECT * FROM users WHERE username = $1`, [ID])
      .then((response) => {
        return response.rows[0];
      });
  } else {
    return db
      .query(`UPDATE users SET name=$1 WHERE username = $2 RETURNING*`, [
        update,
        ID,
      ])
      .then((response) => {
        return response.rows[0];
      });
  }
};

exports.createNewUser = (username, name, avatar_url) => {
  return db
    .query(
      `INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING*`,
      [username, name, avatar_url]
    )
    .then((response) => {
      return response.rows[0];
    });
};
