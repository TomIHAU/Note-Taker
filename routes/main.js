const express = require("express");

const htmlRouter = require("./html");
const apiRouter = require("./api");

const app = express();

app.use("/notes", htmlRouter);
app.use("/api/notes", apiRouter);

module.exports = app;
