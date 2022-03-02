const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("author", AuthorSchema);
