const router = require("express").Router();

const Establishment = require("../models/Establishment.model");
const Comment = require("../models/Comment.model");

router.get("/categories/type", (req, res, next) => {
  Establishment.find({})
    .populate("comments")
    .then((typeCategories) => res.status(200).json(typeCategories))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.post("/categories/establishment", (req, res, next) => {
  const { companyName, location, profileImage, phoneNumber, email } = req.body;

  Establishment.create({
    companyName,
    location,
    profileImage,
    phoneNumber,
    email,
    comments: [],
  })
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(400).json({
        message: "Problem creating your establishment. Try it again later",
      })
    );
});

router.delete("/categories/:postId", (req, res, next) => {
  const { postId } = req.params;

  Establishment.findByIdAndRemove(postId)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Problem deteling your establishment post" })
    );
});

router.get("/categories/type/:id", (req, res, next) => {
  const { id } = req.params;
  Establishment.findById(id)
    .populate("comments")
    .then((uniquePost) => res.status(200).json(uniquePost))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

module.exports = router;
