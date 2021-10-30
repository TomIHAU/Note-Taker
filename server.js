const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

let database = require("./db/db.json");

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.js"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  getNotes;
});
app.post("/api/notes", (req, res) => {
  saveNote;
});
app.delete("/api/notes", (req, res) => {
  deleteNote;
});
