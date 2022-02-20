const express = require('express');
const apiRouter = express.Router()

const groupRouter = require('./groups.router')
const userRouter = require('./users.router')
const venueRouter = require('./venues.router')

apiRouter.use('/users', userRouter)
apiRouter.use('/groups', groupRouter)
apiRouter.use('/venues', venueRouter)

apiRouter.get('/', (req, res) => {
   const instruction = require('../endpoints.json')
   res.statusCode = 200;
   res.json(instruction);
})
module.exports = apiRouter
