const Booking = require("../models/booking");

const getAllBooking = async () => {
  const booking = await Booking.find().populate("venue").populate("package").populate("event");
  return booking;
};

const createBooking = async (bookingData) => {
  const {
    venue,
    package,
    event,
    booking_start,
    booking_end,
    booking_time,
    expected_guest,
    event_name,
    description,
    request,
    first_name,
    last_name,
    email,
    number,
    total_price,
  } = bookingData;

  if (!venue) {
    throw new Error("Venue are required.");
  }
  if (!package) {
    throw new Error("Package are required.");
  }
  if (!event) {
    throw new Error("Event are required.");
  }

  const newBooking = new Booking({
    venue,
    package,
    event,
    booking_start,
    booking_end,
    booking_time,
    expected_guest,
    event_name,
    description,
    request,
    first_name,
    last_name,
    email,
    number,
    total_price,
  });

  await newBooking.save();
  return newBooking;
};

const updateBooking = async (id, updates) => {
  const {
    venue,
    package,
    event,
    booking_start,
    booking_end,
    booking_time,
    expected_guest,
    event_name,
    description,
    request,
    first_name,
    last_name,
    email,
    number,
    total_price,
  } = updates;
  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      venue,
      package,
      event,
      booking_start,
      booking_end,
      booking_time,
      expected_guest,
      event_name,
      description,
      request,
      first_name,
      last_name,
      email,
      number,
      total_price,
    },
    { new: true }
  );

  if (!booking) throw new Error("Error updating Booking");
  return booking;
};

const deleteBooking = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new Error("Booking not found");
  return booking;
};

module.exports = { getAllBooking, createBooking, updateBooking, deleteBooking };
