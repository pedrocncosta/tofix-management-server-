const router = require("express").Router();

const Comment = require("../models/Comment.model");
const Establishment = require("../models/Establishment.model");
const User = require("../models/User.model");

router.post("/categories/type/:id/comment", (req, res, next) => {
  const { name, comments } = req.body;
  const {id} = req.params;
  const { _id } = req.payload;

  Comment.create({ name, comments, author: _id })
    .then((newComment) => {
      return Establishment.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((newComment) => {
      return User.findByIdAndUpdate(
        _id,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(400).json({ message: "No comment added. Please, try again." })
    );
});

module.exports = router;
