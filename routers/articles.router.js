const articlesRouter = require("express").Router();
const {
  getArticleByID,
  updateArticleById,
  getArticles,
  getComments,
  postComment,
  patchArticleBody,
  getArticleByTitle,
} = require("../controllers/articles.controller");

articlesRouter.route("/:id").get(getArticleByID).patch(updateArticleById);
articlesRouter.route("/body/:id").patch(patchArticleBody);
articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment);

articlesRouter.route("/title/:title").get(getArticleByTitle);

module.exports = articlesRouter;
