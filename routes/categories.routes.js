const router = require("express").Router();

const mongoose = require("mongoose");

const Establishment = require("../models/Establishment.model");

router.get("/api/categories/home", (req, res, next) => {
  Establishment.find({})
    .populate("comments")
    .then((homeCategories) => res.status(200).json(homeCategories))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.get("/api/categories/auto", (req, res, next) => {
  Establishment.find({})
    .populate("comments")
    .then((autoCategories) => res.status(200).json(autoCategories))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.get("/api/categories/devices", (req, res, next) => {
  Establishment.find({})
    .populate("comments")
    .then((devicesCategories) => res.status(200).json(devicesCategories))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.post("/api/categories/establishment", (req, res, next) => {
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

router.delete("/api/categories/:postId", (req, res, next) => {
  const { postId } = req.params;

  Establishment.findByIdAndRemove(postId)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Problem deteling your establishment post" })
    );
});

module.exports = router;
