const express = require("express");
const app = express();
const { getUsers } = require("./Controllers/users.controller");
const { getVenues } = require("./Controllers/venues.controller");
const { getGroups } = require("./Controllers/groups.controller");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Orchestrate:Nctcch22@caffeineo1.8izcc.mongodb.net/orchestrate"
);

app.use(express.json());

app.get("/users", getUsers);

app.get("/venues", getVenues);

app.get("/groups", getGroups);

module.exports = app;
