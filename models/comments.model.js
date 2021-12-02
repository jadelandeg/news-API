const db = require("../db/connection");

exports.checkIfCommentExists = (ID) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id  = $1;", [ID])
    .then((response) => {
      console.log(response);
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comment doesn't exist" });
      }
    });
};

exports.removeComment = (ID) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [ID])
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "comment doesn't exist" });
      }
    });
};
