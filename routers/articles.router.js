const articlesRouter = require("express").Router();
const {
  getArticleByID,
  updateArticleById,
  getArticles,
  getComments,
  postComment,
} = require("../controllers/articles.controller");

articlesRouter.route("/:id").get(getArticleByID).patch(updateArticleById);
articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment);

module.exports = articlesRouter;
