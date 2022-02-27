const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { first: String, last: String },
  avatar_url: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true },
  location: {
    postcode: String,
    city: String,
    country: String,
  },
  instruments: [],
  hash: String,
  salt: String,
  events: [{ title: String, to: { day: Number, year: Number, month: Number }, from: { day: Number, year: Number, month: Number } }],
  group: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Group" }],
  friends: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  venues: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Venue" }],
});

module.exports = mongoose.model("User", userSchema);
