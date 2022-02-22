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
  const { venueId } = params;
  const query = await Venues.findById(venueId);
  return query;
};

exports.patchSingleVenue = async (id, info) => {
  const { venueId } = id;
  const { name, avatar_url, location, contact } = info;

  let query = await Venues.findById(venueId);

  query.name = name;
  query.avatar_url = avatar_url;
  query.location.street = location.street;
  query.location.number = location.number;
  query.location.postcode = location.postcode;
  query.location.city = location.city;
  query.location.country = location.country;
  query.contact.name = contact.name;
  query.contact.number = contact.number;
  query.contact.email = contact.email;

  await query.save();

  return query;
};
