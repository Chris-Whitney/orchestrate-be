const express = require("express");
const app = express();
const { getUsers } = require("./Controllers/users.controller");
const { getVenues } = require("./Controllers/venues.controller");
const { getGroups } = require("./Controllers/groups.controller");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Orchestrate:Nctcch22@caffeineo1.8izcc.mongodb.net/orchestrate"
);

const apiRouter = require('./routers/api.router');

app.use(express.json());

app.use("/api", apiRouter)



module.exports = app;
