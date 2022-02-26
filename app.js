const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { validPassword } = require("./utils/password.utils");
const User = require("./Schemas/User");
const cors = require("cors");
const loginRouter = require('./routers/login.router');
const apiRouter = require('./routers/api.router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const sessionStore = new MongoStore({
  mongoUrl: process.env.DATABASE_URL,
  collection: "session",
});
mongoose.connect(process.env.DATABASE_URL);
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
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
        const isValid = validPassword(password, user.hash, user.salt);
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

passport.serializeUser((user, done) => {
  console.log(user.id, "< SEARIAL")
  return done(null, user.id)
});
passport.deserializeUser((userId, done) => {
  console.log(userId, " Deserialize <---")
  User.findById(userId)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});
app.use(passport.initialize())
app.use(passport.session())

app.use("/api", apiRouter);
app.use("/login", loginRouter);

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
