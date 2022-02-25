const express = require('express');
const { getGroups, saveGroup, removeGroup, getSingleGroup, amendSingleGroup, getMembers, getOwners } = require("../Controllers/groups.controller");
const groupRouter = express.Router()

groupRouter.route('/')
   .get(getGroups)
   .post(saveGroup)
   .delete(removeGroup)

groupRouter.route('/:groupId')
   .get(getSingleGroup)
   .patch(amendSingleGroup)

groupRouter.route('/:groupId/members')
.get(getMembers)

groupRouter.route('/:groupId/owner')
.get(getOwners)

module.exports = groupRouter
