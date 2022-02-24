exports.loginFail = (req, res, next) => {
    res.status(200).send({ msg: 'Login Failed'})
}

exports.loginPass = (req, res, next) => {
    res.status(200).send({ msg: 'Login Successful'})
}

exports.fetchLogin = (req, res, next) => {
    res.sendFile(__dirname + "/form.html");
    }