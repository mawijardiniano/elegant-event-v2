const bookingService = require("../services/booking.service");

const getAllBooking = async (req, res) => {
  try {
    const booking = await bookingService.getAllBooking();
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.body;
    const booking = await bookingService.updateBooking(id, {
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
    res.status(200).json({ message: "Booking updated successfully" }, booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await bookingService.deleteBooking(id);
    res.status(200).json({ message: "Booking deleted successfully" }, booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllBooking, createBooking, updateBooking, deleteBooking };
