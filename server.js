const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
let db = require("./db/db.json");
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
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

app.delete("/api/notes/:id", (req, res) => {
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

app.listen(PORT, () => console.log(`Listening for requests on port ${PORT}!`));
