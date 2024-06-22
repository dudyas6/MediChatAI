const router = require("express").Router();
const users = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.route("/get").get((req, res) => {
    users
      .find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route('/').post((req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  users.findOne({ username: username })
    .then((existingUser) => {
      if (existingUser) {
        // User already exists
        return res.status(400).json('Error: User already exists');
      }

      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          return res.status(500).json('Error: ' + err);
        }

        const newUser = new users({
          username,
          password: hash,
        });

        newUser
          .save()
          .then(() => res.json('User added!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      });
    })
    .catch((err) => res.status(500).json('Error: ' + err));
});

module.exports = router;
