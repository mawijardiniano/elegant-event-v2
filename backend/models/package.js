const mongoose = require("mongoose");
const { type } = require("os");

const packageSchema = new mongoose.Schema({
  pkg_name: {
    type: String,
    required: true,
  },
  pkg_price: {
    type: String,
    required: true,
  },
  pkg_desc: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Package", packageSchema);
