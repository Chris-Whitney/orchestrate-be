const express = require('express');
const { getUsers, saveUser } = require("../Controllers/users.controller");
userRouter = express.Router()

userRouter.route('/')
   .get(getUsers)
   .post(saveUser)

module.exports = userRouter