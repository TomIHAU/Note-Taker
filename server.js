const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

let database = require("./db/db.json");

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
