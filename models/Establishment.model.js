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
    default:
      "https://images.squarespace-cdn.com/content/v1/59738f1b579fb3d3def5277b/1557757790016-D39DCOD04B34RADLGWDL/371-3715138_advertise-here-advertise-here.png.jpeg",
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
