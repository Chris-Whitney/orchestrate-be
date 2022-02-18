const express = require('express');
const { getVenues, saveVenue, removeVenue } = require('../Controllers/venues.controller');
venueRouter = express.Router()

venueRouter.route('/')
   .get(getVenues)
   .post(saveVenue)
   .delete(removeVenue)

module.exports = venueRouter