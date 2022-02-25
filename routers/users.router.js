const express = require('express');
const { getUsers, saveUser, removeUser, getSingleUser, amendSingleUser, getFriendsList, getGroupsList, getVenuesList, getEvents, saveEvents } = require("../Controllers/users.controller");
userRouter = express.Router()

userRouter.route('/')
   .get(getUsers)
   .post(saveUser)
   .delete(removeUser)

userRouter.route('/:userId')
   .get(getSingleUser)
   .patch(amendSingleUser)

userRouter.route('/:userId/friends')
   .get(getFriendsList)

userRouter.route('/:userId/groups')
   .get(getGroupsList)

userRouter.route('/:userId/venues')
   .get(getVenuesList)

userRouter.route('/:userId/events')
   .get(getEvents)
   .post(saveEvents)

module.exports = userRouter