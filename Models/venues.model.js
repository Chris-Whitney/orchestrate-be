const Venues = require("../Schemas/Venue.js");

exports.fetchVenues = async () => {
  let query = await Venues.find({});

  return query;
};

exports.postVenue = async (body) => {
  const { name, avatar_url, location, contact } = body;
  await Venues.create({
    name,
    avatar_url,
    location: {
      street: location.street,
      number: location.number,
      postcode: location.postcode,
      city: location.city,
      country: location.country,
    },
    contact: {
      name: contact.name,
      number: contact.number,
      email: contact.email,
    },
  });
  let result = await Venues.find({ name });
  return result;
};

exports.deleteVenue = async (body) => {
  const { id } = body;
  await Venues.deleteOne({ _id: id });
  return;
};

exports.fetchSingleVenue = async (params) => {
  const { venueId } = params
  const query = await Venues.findById(venueId)
  return query
}