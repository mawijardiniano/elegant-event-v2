const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  pkg_name: {
    type: String,
    required: true,
  },
  pkg_price: {
    type: Number,
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
