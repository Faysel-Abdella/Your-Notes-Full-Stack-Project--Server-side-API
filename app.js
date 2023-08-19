const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

//For parsing json data(application/json) from incoming req we use the following
app.use(bodyParser.json());
app.use(morgan("dev"));
dotenv.config();

app.get("/", (req, res, next) => {
  res.send("Hi :)");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server running... :)");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
