const api = require("express").Router();
const { v4: uuidv4 } = require("uuid");
let db = require("../db/db.json");
const path = require("path");
const fs = require("fs");

api.get("/", (req, res) => {
  res.json(db);
});

api.post("/", (req, res) => {
  let notePosted = req.body;
  notePosted.id = uuidv4();

  let notes = db;
  notes.push(notePosted);

  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error writing the file");
      return;
    } else {
      res.status(201);
    }
  });
  res.json(notes);
});

api.delete("/:id", (req, res) => {
  let keptNotes = db.filter((note) => note.id != req.params.id);
  db = keptNotes;
  fs.writeFile("./db/db.json", JSON.stringify(keptNotes), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error writing the file");
      return;
    } else {
      res.status(201);
    }
  });
  res.json(keptNotes);
});

module.exports = api;
