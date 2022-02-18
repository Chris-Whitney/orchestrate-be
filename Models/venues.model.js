const Venues = require("../Schemas/Venue.js");

exports.fetchVenues = async () => {
  let query = await Venues.find({});

  return query;
};

exports.postVenue = async (body) => {
  const { name, avatar_url, location, contact } = body;

  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.deleteVenue = async (body) => {
  const { id } = body;
  try {
    await Venues.deleteOne({ _id: id });

    return;
  } catch (error) {
    console.log(error);
  }
};
