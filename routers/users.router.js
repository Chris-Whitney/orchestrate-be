const express = require('express');
const { getUsers, saveUser, removeUser, getSingleUser } = require("../Controllers/users.controller");
userRouter = express.Router()

userRouter.route('/')
   .get(getUsers)
   .post(saveUser)
   .delete(removeUser)

userRouter.route('/:userId')
   .get(getSingleUser)

module.exports = userRouter