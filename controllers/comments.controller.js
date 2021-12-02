const {
  removeComment,
  checkIfCommentExists,
  updateCommentVotes,
  updateCommentBody,
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

exports.patchCommentVotes = (req, res, next) => {
  const ID = req.params.comment_id;
  const votes = req.body.inc_votes;

  if (votes && typeof votes !== "number") {
    res.status(400).send({ msg: "request must be a number" });
  }

  Promise.all([updateCommentVotes(ID, votes), checkIfCommentExists(ID)])
    .then(([response]) => {
      res.status(200).send({ comment: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentBody = (req, res, next) => {
  const ID = req.params.comment_id;
  const body = req.body.body;
  Promise.all([updateCommentBody(ID, body), checkIfCommentExists(ID)])
    .then(([response]) => {
      res.status(200).send({ comment: response });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
