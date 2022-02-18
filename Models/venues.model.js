
const Venues = require('../Schemas/Venue.js');

exports.fetchVenues = async () => {
    let query = await Venues.find({});

    return query;
}