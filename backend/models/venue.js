const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  venue_name: {
    type: String,
    required: true,
    unique: true,
  },
  venue_desc: {
    type: String,
    required: true,
  },
  venue_price: {
    type: Number,
    required: true,
  },
  venue_capacity: {
    type: Number,
    required: true,
  },
  venue_loc: {
    type: String,
    required: true,
  },
  venue_tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

module.exports = mongoose.model("Venue", venueSchema);
