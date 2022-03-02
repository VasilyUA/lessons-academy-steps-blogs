const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  postid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("comments", CommentsSchema);
