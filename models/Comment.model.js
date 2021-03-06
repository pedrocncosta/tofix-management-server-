const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, default: "img" },
  comments: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" }
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
