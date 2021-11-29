const db = require("../connection");
const format = require("pg-format");
const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data

  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
    slug VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL
    )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(100) PRIMARY KEY NOT NULL UNIQUE,
      avatar_url VARCHAR,
      name VARCHAR(100) NOT NULL
    )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      body VARCHAR,
      votes INTEGER DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug), 
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        article_id INTEGER REFERENCES articles(article_id),
        votes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body VARCHAR
        
      )`);
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description];
      });
      const queryStr = format(
        `INSERT INTO topics (slug, description)
      VALUES %L
      RETURNING *;`,
        formattedTopics
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
      });
      const queryStr = format(
        `INSERT INTO users (username, avatar_url, name)
        VALUES %L
        RETURNING*;`,
        formattedUsers
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        return [
          article.title,
          article.body,
          article.votes,
          article.topic,
          article.author,
          article.created_at,
        ];
      });
      const queryStr = format(
        `INSERT INTO articles (title, body, votes, topic, author, created_at)
      VALUES %L
      RETURNING*;`,
        formattedArticles
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedComments = commentData.map((comment) => {
        return [
          comment.author,
          comment.article_id,
          comment.votes,
          comment.created_at,
          comment.body,
        ];
      });
      const queryStr = format(
        `INSERT INTO comments (author, article_id, votes, created_at, body)
      VALUES %L
      RETURNING*;`,
        formattedComments
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
