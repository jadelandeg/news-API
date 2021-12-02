const db = require("../db/connection");

exports.checkIfCommentExists = (ID) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id  = $1;", [ID])
    .then((response) => {
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

exports.updateCommentVotes = (ID, votes) => {
  if (!votes) {
    return db
      .query(`SELECT * FROM comments WHERE comment_id = $1`, [ID])
      .then((response) => {
        return response.rows[0];
      });
  } else {
    return db
      .query(
        `UPDATE comments SET votes=votes + $1 WHERE comment_id = $2 RETURNING *`,
        [votes, ID]
      )
      .then((response) => {
        return response.rows[0];
      });
  }
};

exports.updateCommentBody = (ID, body) => {
  if (!body) {
    console.log(ID);
    return db
      .query(`SELECT * FROM comments WHERE comment_id = $1`, [ID])
      .then((response) => {
        return response.rows[0];
      });
  } else {
    return db
      .query(`UPDATE comments SET body=$1 WHERE comment_id = $2 RETURNING*`, [
        body,
        ID,
      ])
      .then((response) => {
        return response.rows[0];
      });
  }
};
