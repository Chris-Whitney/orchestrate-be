const express = require('express');
const { getVenues, saveVenue, removeVenue, getSingleVenue, amendSingleVenue } = require('../Controllers/venues.controller');
const venueRouter = express.Router()

venueRouter.route('/')
   .get(getVenues)
   .post(saveVenue)
   .delete(removeVenue)

venueRouter.route('/:venueId')
   .get(getSingleVenue)
   .patch(amendSingleVenue)

module.exports = venueRouter