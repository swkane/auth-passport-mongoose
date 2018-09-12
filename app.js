const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/basic-auth");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("connected to mongo db");
});

// Route files
let users = require("./routes/users");
app.use("/users", users);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000")
);
