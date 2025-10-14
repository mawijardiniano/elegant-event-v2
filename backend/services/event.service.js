const Event = require("../models/eventType");

const createEventType = async (event_name) => {
  const event = await Event.findOne({ event_name });

  if (event) throw new Error("Event name already exist");

  const newEvent = new Event({ event_name });
  await newEvent.save();
  return newEvent;
};

const getAllEvent = async () => {
  const event = await Event.find();
  return event;
};

const updateEvent = async (id, update) => {
  const { event_name } = update;

  const event = await Event.findByIdAndUpdate(
    id,
    { event_name },
    { new: true }
  );

  if (!event) throw new Error("Error updating event");

  return event;
};

const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new Error("Event not found");
  return event;
};

module.exports = { createEventType, getAllEvent, updateEvent, deleteEvent };
