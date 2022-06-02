const router = require("express").Router();

const User = require("../models/User.model");

router.put("/api/profile/:userId	", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
