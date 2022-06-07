const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default:
        "https://i.pinimg.com/236x/ee/33/bf/ee33bf536025fc8cd7f719ff84fb7a43--bob-the-builder-cake-top-websites.jpg",
    },
    profileType: { type: String, enum: ["admin", "user"], default: "user" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    establishments: [{ type: Schema.Types.ObjectId, ref: "Establishment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
