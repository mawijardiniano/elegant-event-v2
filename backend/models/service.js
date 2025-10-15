const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serv_name: {
    type: String,
    required: true,
  },
  serv_price: {
    type: String,
    required: true,
  },
  serv_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
