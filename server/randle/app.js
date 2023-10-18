var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var guessesRouter = require("./routes/guesses");
var categoriesRouter = require("./routes/categories");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/randle/dist")));

app.use("/", indexRouter);
app.use("/guesses", guessesRouter);
app.use("/categories", categoriesRouter);

module.exports = app;
