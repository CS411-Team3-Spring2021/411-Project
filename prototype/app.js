const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Entry = require("./routes/entries");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const projectRouter = require("./routes/project");

const app = express();

// connect to mongoDB
const dbURI =
    "mongodb+srv://olivia_user:<cs411finalprojectpassword>@cluster0.cc0rc.mongodb.net/user-journal-entries?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db")) // app.listen(3000) ?
    .catch((err) => console.log(err));

//mongoose and mongo sandbox routes

//adding a new entry
app.get("/add-entry", (req, res) => {
  const entry = new Entry({
    entry: "new entry",
    date: "today",
    user_id: "nickname",
    feeling: "how i'm feeling",
  });

  //saving an entry to the database
  entry
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      }); //asynchronous task
});

//access all of a user's previous entries
app.get("/all-entries", (req, res) => {
  Entry.find()
      .then((results) => {
        //gives us all of the documents in the entries collection
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

//accessing a user's specific entry
app.get("/single-entry", (req, res) => {
  Entry.findById()
      .then((result) => {
        //TODO: need to add an input in Id() ??
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

//timestamp: 31:06 / 35:55

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/project", projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
