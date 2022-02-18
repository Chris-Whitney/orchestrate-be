const express = require('express');
const { getGroups } = require("../Controllers/groups.controller");
groupRouter = express.Router()

groupRouter.route('/')
   .get(getGroups)


module.exports = groupRouter