const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const config = require("./config/database");

const app = express();
app.use(express.json());

mongoose.connect(config.database);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("connected to mongo db");
});

// Passport config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route files
let users = require("./routes/users");
app.use("/users", users);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000")
);
