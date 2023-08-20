const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");

const app = express();

//For parsing json data(application/json) from incoming req we use the following
app.use(bodyParser.json());
app.use(morgan("dev"));
dotenv.config();

app.get("/", (req, res, next) => {
  res.send("Hi :)");
});

const taskRoute = require("./routes/taskRoute");

app.use(taskRoute);

//General error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went error(error msg not passed)";
  res.status(statusCode).json({ message: message });
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
