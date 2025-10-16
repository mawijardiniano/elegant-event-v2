const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  booking_start: {
    type: Date,
    required: true,
  },
  booking_end: {
    type: Date,
    required: true,
  },
  booking_time: {
    type: String,
    required: true,
  },
  expected_guest: {
    type: Number,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  request: {
    type: String,
    default: '',
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
