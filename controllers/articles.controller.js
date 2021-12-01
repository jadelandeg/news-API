const {
  fetchArticleByID,
  checkIfArticleExists,
  changeArticleById,
  fetchArticles,
  fetchComments,
  newComment,
} = require("../models/articles.model");

const { checkIfTopicExists } = require("../models/topics.model");

exports.getArticleByID = (req, res, next) => {
  console.log("in controller");
  const articleID = req.params.id;
  Promise.all([fetchArticleByID(articleID), checkIfArticleExists(articleID)])
    .then(([result]) => {
      res.status(200).send({ article: result });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.updateArticleById = (req, res, next) => {
  const articleID = req.params.id;
  const articleVotes = req.body.inc_votes;

  if (!articleVotes) {
    res.status(400).send({ msg: "request must contain a body" });
  } else if (typeof articleVotes !== "number") {
    res.status(400).send({ msg: "request must be a number" });
  }
  {
    Promise.all([
      changeArticleById(articleID, articleVotes),
      checkIfArticleExists(articleID, articleVotes),
    ])
      .then(([result]) => {
        res.status(200).send({ article: result });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getArticles = (req, res, next) => {
  const queryParams = req.query;
  fetchArticles(queryParams)
    .then((response) => {
      res.status(200).send({ articles: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const ID = req.params.article_id;
  Promise.all([fetchComments(ID), checkIfArticleExists(ID)])
    .then(([response]) => {
      res.status(200).send({ comments: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const ID = req.params.article_id;
  const body = req.body;
  if (!body.author || !body.body) {
    res.status(400).send({ msg: "request must contain a body" });
  } else {
    newComment(ID, body)
      .then((response) => {
        res.status(201).send({ comment: response });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};
