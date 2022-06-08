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
      "https://mpng.subpng.com/20190226/gje/kisspng-clip-art-restaurant-vector-graphics-illustration-b-5c75868baec140.2635704815512060277158.jpg",
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
