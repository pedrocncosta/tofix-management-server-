const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/21/21294.png",
    },
    profileType: { type: String, enum: ["admin", "user"], default: "user" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: { type: String },
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
