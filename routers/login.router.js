const express = require('express')
const { loginFail, loginPass, fetchLogin, checkLogin } = require('../Controllers/login.controller')

const loginRouter = express.Router()

loginRouter.route('/')
    .get(fetchLogin)
    .post(checkLogin)

loginRouter.route('/fail')
    .get(loginFail)

loginRouter.route('/pass')
    .get(loginPass)

module.exports = loginRouter

