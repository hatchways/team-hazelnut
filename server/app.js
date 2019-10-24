import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

import dbConnection from "./db/mongoose";
import indexRouter from "./routes/index";
import profileRouter from "./routes/profile";
import pingRouter from "./routes/ping";
import photoRouter from "./routes/photo";
import usersRouter from "./routes/users";
import fileUploadRouter from "./routes/file-upload";
import conversationRouter from "./routes/conversation";

var app = express();

// socket.io
var socket_io = require( "socket.io" );
var io = socket_io();
app.io = io;

// When a client connects, show message in the console
io.on('connection', function (socket) {
  console.log('A client is connected!');
  socket.on("message", msg => {
    io.emit("message", msg);
    //broadcast message to everyone in port:3000 except yourself.
    socket.broadcast.emit("received", { message: msg  });
  });
});


app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(join(__dirname, "public")));

app.use(passport.initialize());
require("./libs/passport")(passport);

app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/ping", pingRouter);
app.use("/profile-photo", photoRouter);
app.use("/users", usersRouter);
app.use("/files", fileUploadRouter);
app.use("/conversation", conversationRouter);

app.use(cors());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
