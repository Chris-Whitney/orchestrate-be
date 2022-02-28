const express = require('express');
const { removeVenue, saveVenues, getUsers, saveUser, removeUser, getSingleUser, amendSingleUser, getFriendsList, getGroupsList, getVenuesList, getEvents, searchUsers, saveEvents, deleteEvent } = require("../Controllers/users.controller");
userRouter = express.Router()

userRouter.route('/')
   .get(getUsers)
   .post(saveUser)

userRouter.route('/search')
   .get(searchUsers)

userRouter.route('/:userId')
   .get(getSingleUser)
   .patch(amendSingleUser)
   .delete(removeUser)

userRouter.route('/:userId/friends')
   .get(getFriendsList)

userRouter.route('/:userId/groups')
   .get(getGroupsList)

userRouter.route('/:userId/venues')
   .get(getVenuesList)
/*    .post(saveVenues)

userRouter.route('/:userId/venues/:venueId')
   .delete(removeVenue) */

userRouter.route('/:userId/events')
   .get(getEvents)
   .post(saveEvents)

userRouter.route('/:userId/events/:eventId')
   .delete(deleteEvent)

module.exports = userRouter