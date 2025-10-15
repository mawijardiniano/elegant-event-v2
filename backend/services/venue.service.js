const Tag = require("../models/tag");
const Venue = require("../models/venue");

const getAllVenue = async () => {
  const venue = await Venue.find();
  return venue;
};

const createVenue = async (
  venue_name,
  venue_capacity,
  venue_desc,
  venue_loc,
  venue_price,
  venue_tag
) => {
  const existingVenue = await Tag.findOne({ venue_name });

  if (existingVenue) throw new Error("Venue already exists");

  if (venue_tag && venue_tag.length > 0) {
    const tagsExist = await Tag.find({ _id: { $in: venue_tag } });
    if (tagsExist.length !== venue_tag.length)
      throw new Error("One or more tags not found");
  }

  const newVenue = new Venue({
    venue_name,
    venue_capacity,
    venue_desc,
    venue_loc,
    venue_price,
    venue_tag,
  });

  await newVenue.save();
  return newVenue;
};

const updateVenue = async (id, updates) => {
    const { venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag,} = updates
  const venue = await Venue.findByIdAndUpdate(
    id,
    {
      venue_name,
      venue_capacity,
      venue_desc,
      venue_loc,
      venue_price,
      venue_tag,
    },
    { new: true }
  );
  if (!venue) throw new Error('Error updating venue')

    return venue
};

const deleteVenue = async (id) => {
    const venue = await Venue.findByIdAndDelete(id)
    if(!venue) throw new Error('Venue not found')
    return venue
}

module.exports = { getAllVenue, createVenue , updateVenue, deleteVenue};
