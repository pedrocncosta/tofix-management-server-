const router = require("express").Router();

const Establishment = require("../models/Establishment.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/categories/type", (req, res, next) => {
  Establishment.find({})
    .populate({
      path: "comments",
      populate: { path: "author" },
    })

    .then((typeCategories) => res.status(200).json(typeCategories))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.post("/categories/establishment", (req, res, next) => {
  const { _id } = req.payload;

  const {
    companyName,
    location,
    profileImage,
    phoneNumber,
    email,
    profileType,
    establishmentOwner,
  } = req.body;

  /* if (profileType !== "admin") return;
   */
  Establishment.create({
    companyName,
    location,
    profileImage,
    phoneNumber,
    email,
    establishmentOwner: _id,
  })
    .then((newEstablishment) => {
      console.log(newEstablishment);
      return User.findByIdAndUpdate(
        _id,
        { $push: { establishments: newEstablishment._id } },
        { new: true }
      );
    })
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(400).json({
        message: "Problem creating your establishment. Try it again later",
      })
    );
});

router.get("/categories/type/:id", (req, res, next) => {
  const { id } = req.params;
  Establishment.findById(id)
    .populate("establishmentOwner")
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .then((uniquePost) => res.status(200).json(uniquePost))
    .catch((err) => res.status(400).json({ message: "No posts were found" }));
});

router.delete("/categories/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.payload;

  try {
    let establishmentToDelete = await Establishment.findById(id);
    console.log(establishmentToDelete);
    if (establishmentToDelete.establishmentOwner != _id) {
      res.status(400).json({ errorMessage: "You are not the owner" });
      return;
    }

    let deletedEstablishment = await Establishment.findByIdAndRemove(id);

    await User.findByIdAndUpdate(_id, {
      $pull: { establishments: deletedEstablishment._id },
    });
    res.status(200).json({
      message: `deleted establishment ${deletedEstablishment.companyName}`,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
