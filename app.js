const express = require("express");
const dotenv = require("dotenv");
const apiRouter = require("./routers/api.router");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { validePassword } = require("./utils/password.utils");
const User = require("./Schemas/User");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dotenv.config();

const sessionStore = new MongoStore({
  mongoUrl: "mongodb+srv://Orchestrate:Nctcch22@caffeineo1.8izcc.mongodb.net/orchestrate",
  collection: "session",
});
mongoose.connect("mongodb+srv://Orchestrate:Nctcch22@caffeineo1.8izcc.mongodb.net/orchestrate");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("local strategy");
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          console.log("invalid user");
          return done(null, false);
        }
        const isValid = validePassword(password, user.hash, user.salt);
        if (isValid) {
          console.log("valid user, valid password");
          return done(null, user);
        } else {
          console.log("valid user, invalid password");
          done(null, false);
        }
      })
      .catch((err) => {
        console.log(err);
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

app.use("/api", apiRouter);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/pass",
    failureRedirect: "/fail",
  })
);

app.get("/login", (req, res, next) => {
  res.sendFile(__dirname + "/form.html");
});
app.post("/fail", (req, res, next) => {
  console.log("failed");
  res.status(200).send({ msg: "Invalid logging details" });
});

app.post("/pass", (req, res, next) => {
  console.log("passed");
  res.status(200).send({ msg: "valid logging details" });
});
// error handling:

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use((err, req, res, next) => {
  if (err.code == "11000") {
    res.status(400);
    res.send({ msg: `already taken`, value: err.keyValue });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error", error: err });
});

module.exports = app;
