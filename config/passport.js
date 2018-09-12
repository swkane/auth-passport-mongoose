const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const config = require("./database");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  // Local Strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      let query = { username };
      User.findOne(query, (err, user) => {
        err && console.log(err);
        if (!user) {
          console.log("no user found");
          // Passport documentation on LocalStrategy
          return done(null, false, { message: "No User Found" });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          err && console.log(err);
          if (isMatch) {
            console.log("successful login");
            return done(null, user);
          } else {
            console.log("wrong password");
            return done(null, false, { message: "Wrong Password" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
