const express = require('express');
const { getVenues, saveVenue, removeVenue, getSingleVenue } = require('../Controllers/venues.controller');
venueRouter = express.Router()

venueRouter.route('/')
   .get(getVenues)
   .post(saveVenue)
   .delete(removeVenue)

venueRouter.route('/:venueId')
   .get(getSingleVenue)

module.exports = venueRouter