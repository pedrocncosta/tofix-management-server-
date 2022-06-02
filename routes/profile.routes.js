const router = require("express").Router();

const User = require("../models/User.model");

router.get("/users", (req, res, next) => {
  User.find({})
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
