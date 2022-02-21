const express = require("express");
const dotenv = require('dotenv')
const apiRouter = require('./routers/api.router');
const mongoose = require("mongoose");

const app = express();
dotenv.config()

mongoose.connect(process.env.DATABASE_URL);


app.use(express.json());

app.use("/api", apiRouter)

// error handling: 

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use((err, req, res, next) => {
  if (err.code == "11000") {
    res.status(400)
    res.send({ msg: `already taken`, value: err.keyValue })
  } else {
    next(err)
  }
})
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal server error", error: err });
});

module.exports = app;
