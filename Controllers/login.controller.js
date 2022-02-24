const passport = require('passport')
exports.loginFail = (req, res, next) => {
    res.status(200).send({ msg: 'Login Failed'})
}

exports.loginPass = (req, res, next) => {
    res.status(200).send({ msg: 'Login Successful'})
}

exports.fetchLogin = (req, res, next) => {
    res.sendFile(__dirname + "/form.html");
    }

exports.checkLogin = passport.authenticate("local", {
        successRedirect: "/login/pass",
        failureRedirect: "/login/fail",
    })
    