require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
const { sendResponse } = require("./helpers/utils");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//init db
require("./dbs/init.mongodb");

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  const error = new AppError(404, "Route Not Found", "Bad Request");
  next(error);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err.message);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    err.isOperational ? err.isOperational : "Internal server error",
    err.message
  );
});

module.exports = app;
