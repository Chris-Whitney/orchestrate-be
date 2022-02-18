const express = require('express');
const { getGroups, saveGroup, removeGroup} = require("../Controllers/groups.controller");
groupRouter = express.Router()

groupRouter.route('/')
   .get(getGroups)
   .post(saveGroup)
   .delete(removeGroup)



module.exports = groupRouter