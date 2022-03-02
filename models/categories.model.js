const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("category", CategorySchema);
