const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  try {
    const { event_name } = req.body;
    const event = await eventService.createEventType(event_name);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const event = await eventService.getAllEvent();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { event_name } = req.body;

    const event = await eventService.updateEvent(id, { event_name });
    res.json({ message: "Admin updated successfully " }, event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await eventService.deleteEvent(id);
    res.status(200).json({ message: "Event deleted successfully" }, event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };
