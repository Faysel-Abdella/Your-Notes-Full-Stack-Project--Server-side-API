const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

//For parsing json data(application/json) from incoming req we use the following
app.use(bodyParser.json());
app.use(morgan("dev"));
dotenv.config();

app.get("/", (req, res, next) => {
  res.send("Hi :)");
});

app.listen(8080);
