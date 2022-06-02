const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profileImage: String,
  phoneNumber: Number,
  email: { type: String, required: true, unique: true },
});

const Establishment = model("Establishment", userSchema);

module.exports = Establishment;
