const express = require('express');
const { loginFail, loginPass, fetchLogin } = require('../Controllers/login.controller');

const loginRouter = express.Router()


loginRouter.route('/')
    .get(fetchLogin);

loginRouter.route('/fail')
    .get(loginFail)

loginRouter.route('/pass')
    .get(loginPass)

module.exports = loginRouter

