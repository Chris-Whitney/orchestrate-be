const express = require('express');
const { getGroups, saveGroup, removeGroup, getSingleGroup } = require("../Controllers/groups.controller");
groupRouter = express.Router()

groupRouter.route('/')
   .get(getGroups)
   .post(saveGroup)
   .delete(removeGroup)

groupRouter.route('/:groupId')
   .get(getSingleGroup)

module.exports = groupRouter