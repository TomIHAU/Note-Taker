const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.sendFile("/db/db.json");
});

app.post("/api/notes", (req, res) => {
  let notePosted = req.body;
  let notes = JSON.parse(fs.readFile("/db/db.json", "utf8"));
  notePosted.id = uuidv4();
  notes.push(notePosted);

  fs.writeFile("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes:id", (req, res) => {
  const notes = JSON.parse(fs.readFile("/db/db.json", "utf8"));
  const keptNotes = notes.filter((note) => note.id != req.params.id);

  fs.writeFile("./db/db.json", JSON.stringify(keptNotes));
  res.json(keptNotes);
});

app.listen(PORT, () => console.log(`Listening for requests on port ${PORT}!`));
