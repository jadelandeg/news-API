const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows;
  });
};

exports.checkIfTopicExists = (topic) => {
  return db
    .query("SELECT * FROM articles WHERE article_id  = $1;", [topic])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "topic doesn't exist" });
      }
    });
};
