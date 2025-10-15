const venueService = require("../services/venue.service");

const getAllVenue = async (req, res) => {
  try {
    const venue = await venueService.getAllVenue();
    res.status(200).json(venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVenue = async (req, res) => {
  try {
    const {
      venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag,
    } = req.body;
    const venue = await venueService.createVenue(
      venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag
    );
    res.status(200).json(venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag,
    } = req.body;
    const venue = await venueService.updateVenue(id, {
      venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag,
    });
    res.status(200).json({ message: "Venue updated successfully" }, venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await venueService.deleteVenue(id);
    res.status(200).json({ message: "Venue deleted successfully" }, venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllVenue, createVenue, deleteVenue, updateVenue };
