const express = require('express');
const { getUsers, saveUser, removeUser, getSingleUser, amendSingleUser, getFriendsList, getGroupsList, getVenuesList, searchUsers} = require("../Controllers/users.controller");
const userRouter = express.Router()

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

module.exports = userRouter