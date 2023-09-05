require("express-async-error");

const fs = require("fs");
const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const app = express();

// app.use(cookieParser());

//create a new file for storing morgan logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(cors());
//For parsing json data(application/json) from incoming req we use the following
app.use(bodyParser.json());
app.use(morgan("dev", { stream: accessLogStream }));
dotenv.config();
app.use(express.json());

const taskRoute = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const { verifyJWT } = require("./utils/tokenUtil");

app.use(authRoute);
app.use(taskRoute);
app.use(userRoute);

app.get("/", (req, res, next) => {
  res.send("Hi :)");
});

app.get("/test", (req, res, next) => {
  res.json({ message: "Hello world" });
});

//404 middleware
app.use("*", (req, res, next) => {
  //'*' stands for all routes that do not match the all the above routes
  res.status(StatusCodes.NOT_FOUND).json({ message: "page not found" });
});

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
      console.log("Server running ... :)");
    });
  })
  .catch((err) => {
    console.log("Connecting to MongoDB error", err);
    process.exit(1);
  });
