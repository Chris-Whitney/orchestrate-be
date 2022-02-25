const { fetchSingleUser } = require("../Models/users.model");

const passport = require("passport");

exports.loginFail = (req, res, next) => {
  res.status(200).send({ msg: "Login Failed" });
};

exports.loginPass = (req, res, next) => {
  //  const userId = { userId: req.session.passport.user };
  // fetchSingleUser(userId).then((user) => {
  res.status(200).send({ msg: "Success", session: req.session, store: req.sessionStore, id: req.sessionID, user: req.user });
  // })
};

exports.fetchLogin = (req, res, next) => {
  res.sendFile(__dirname + "/form.html");
};

exports.checkLogin = passport.authenticate('local', { failureRedirect: '/login/fail' }), ((req, res) => {
  res.status(200).send({ user: req.user });
});