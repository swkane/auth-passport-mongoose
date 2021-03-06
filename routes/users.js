const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  let newUser = new User({
    username,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      // err && console.log(err);
      newUser.password = hash;
      newUser.save((err, user) => {
        err && console.log(err);
        console.log(user);
        res.send(`created ${user}`);
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

module.exports = router;
