const {
  removeComment,
  checkIfCommentExists,
} = require("../models/comments.model");

exports.deleteComment = (req, res, next) => {
  const commentID = req.params.comment_id;
  removeComment(commentID)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
