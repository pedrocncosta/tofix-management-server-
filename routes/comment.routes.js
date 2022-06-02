const router = require("express").Router();

const Comment = require("../models/Comment.model");
const Establishment = require("../models/Establishment.model");
const User = require("../models/User.model");

router.post("/comments", (req, res, next) => {
  const { name, img, comments, author, establishmentId } = req.body;

  Comment.create({ name, img, comments, author })
    .then((newComment) => {
      return Establishment.findByIdAndUpdate(
        establishmentId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((newComment) => {
        return User.findByIdAndUpdate(
          author,
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
