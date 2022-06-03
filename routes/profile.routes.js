const router = require("express").Router();

const User = require("../models/User.model");

router.get("/users", (req, res, next) => {
  User.find({})
    .populate("comments establishments")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/user/:userId", (req, res, next) => {
  const { _id } = req.payload;

  User.findById(_id)
    .populate("establishments")
    .populate({
      path: "establishments",
      populate: { path: "comments" },
    })
    .then((user) => {
      res.json(user);
    })
    .catch(() => console.log("oi"));
});

router.put("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
