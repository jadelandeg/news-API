const {
  removeComment,
  checkIfCommentExists,
  updateComment,
} = require("../models/comments.model");

exports.deleteComment = (req, res, next) => {
  const commentID = req.params.comment_id;
  removeComment(commentID)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  updateComment;
};
