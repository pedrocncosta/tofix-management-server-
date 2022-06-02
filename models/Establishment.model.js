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
  profileImage: String,
  phoneNumber: Number,
  email: { type: String, required: true, unique: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Establishment = model("Establishment", establishmentSchema);

module.exports = Establishment;
