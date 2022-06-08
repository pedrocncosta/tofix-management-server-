const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const establishmentSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/2825/2825777.png",
  },
  phoneNumber: Number,
  email: { type: String, required: true, unique: true },
  aboutUs: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  establishmentOwner: { type: Schema.Types.ObjectId, ref: "User" },
  role: { type: String, enum: ["home", "auto", "devices"] },
});

const Establishment = model("Establishment", establishmentSchema);

module.exports = Establishment;
