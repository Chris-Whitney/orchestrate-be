const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  avatar_url: String,
  location: {
    street: String,
    number: Number,
    postcode: String,
    city: String,
    country: String,
  },
  contact: {
    name: String,
    number: String,
    email: String,
  },
});

module.exports = mongoose.model("Venue", venueSchema);
