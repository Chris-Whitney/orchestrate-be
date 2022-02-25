const { fetchSingleUser } = require("../Models/users.model");

const passport = require("passport");

exports.loginFail = (req, res, next) => {
  res.status(200).send({ msg: "Login Failed" });
};

exports.loginPass = (req, res, next) => {
  const userId = { userId: req.session.passport.user };
  // fetchSingleUser(userId).then((user) => {
  res.status(200).send({ msg: "Success", user: req });
  // })
};

exports.fetchLogin = (req, res, next) => {
  res.sendFile(__dirname + "/form.html");
};

exports.checkLogin = passport.authenticate("local", {
  successRedirect: "/login/pass",
  failureRedirect: "/login/fail",
});
