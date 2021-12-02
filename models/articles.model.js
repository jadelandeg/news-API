const e = require("express");
const db = require("../db/connection");

exports.fetchArticleByID = (articleID) => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, 
      COUNT(*) AS comment_count
       FROM articles
      JOIN comments ON comments.article_id = $1
      WHERE articles.article_id = $1
      GROUP BY articles.article_id`,
      [articleID]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.checkIfArticleExists = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id  = $1;", [id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article doesn't exist" });
      }
    });
};

exports.changeArticleById = (id, votes) => {
  if (!votes) {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
      .then((response) => {
        return response.rows[0];
      });
  } else {
    return db
      .query(
        `UPDATE articles SET votes= votes + $1 WHERE article_id = $2 RETURNING *`,
        [votes, id]
      )
      .then((response) => {
        return response.rows[0];
      });
  }
};

exports.fetchArticles = ({ sort_by = "created_at", order = "DESC", topic }) => {
  if (
    ![
      "created_at",
      "author",
      "title",
      "article_id",
      "votes",
      "comment_count",
      "topic",
    ].includes(sort_by) ||
    !["DESC", "ASC", "asc", "desc"].includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "invalid search request" });
  }
  if (topic === undefined) {
    return db
      .query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, 
      COUNT(*) AS comment_count
       FROM articles
     LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order}`
      )
      .then((response) => {
        return response.rows;
      });
  } else {
    if (!["cats", "paper", "mitch"].includes(topic)) {
      return Promise.reject({ status: 404, msg: "not a topic" });
    } else {
      return db
        .query(
          `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, 
    COUNT(*) AS comment_count
     FROM articles
   LEFT JOIN comments ON comments.article_id = articles.article_id
   WHERE articles.topic = $1
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}`,
          [topic]
        )
        .then((response) => {
          return response.rows;
        });
    }
  }
};

exports.fetchComments = (ID) => {
  return db
    .query(`SELECT * FROM comments WHERE comments.article_id = $1`, [ID])
    .then((response) => {
      return response.rows;
    });
};

exports.newComment = (ID, comment) => {
  const { username, body } = comment;
  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *",
      [username, body, ID]
    )
    .then((response) => {
      return response.rows[0];
    });
};
