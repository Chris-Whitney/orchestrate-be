const { fetchSingleUser } = require("../Models/users.model");

const passport = require("passport");
const app = require("../app");

exports.loginFail = (req, res, next) => {
  res.status(200).send({ msg: "Failed" });
};

exports.loginPass = (req, res, next) => {
  //  const userId = { userId: req.session.passport.user };
  // fetchSingleUser(userId).then((user) => {
  console.log(req.session.passport)
  res.status(200).send({ msg: "Success", user: req.user });
  // })
};

exports.fetchLogin = (req, res, next) => {
  res.sendFile(__dirname + "/form.html");
};

exports.checkLogin = passport.authenticate("local", {
  successRedirect: "/login/pass",
  failureRedirect: "/login/fail",
}); 