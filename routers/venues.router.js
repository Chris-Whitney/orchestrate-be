const express = require('express');
const { getVenues } = require('../Controllers/venues.controller');
venueRouter = express.Router()

venueRouter.route('/')
   .get(getVenues)

module.exports = venueRouter