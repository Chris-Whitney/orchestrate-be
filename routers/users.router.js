const express = require('express');
const { getUsers, saveUser, removeUser } = require("../Controllers/users.controller");
userRouter = express.Router()

userRouter.route('/')
   .get(getUsers)
   .post(saveUser)
   .delete(removeUser)

module.exports = userRouter