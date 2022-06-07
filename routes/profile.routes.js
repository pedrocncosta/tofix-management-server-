const router = require("express").Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");


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

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

router.put("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndRemove(userId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
