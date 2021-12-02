const {
  deleteComment,
  patchCommentVotes,
  patchCommentBody,
} = require("../controllers/comments.controller");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .patch(patchCommentVotes);

commentsRouter.route("/body/:comment_id").patch(patchCommentBody);

module.exports = { commentsRouter };
