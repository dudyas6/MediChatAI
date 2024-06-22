const router = require("express").Router();
const users = require("../models/user.model.js");

router.route("/get").get((req, res) => {
    users
      .find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;

  router.route('/add').post((req, res) => {
    const { username, password } = req.body;
  
    // Check if the user already exists
    users.findOne({ username: username })
      .then((existingUser) => {
        if (existingUser) {
          // User already exists
          return res.status(400).json('Error: User already exists');
        }
  
        // Create a new user
        const newUser = new users({
          username,
          password,
            
        });
  
        // Save the new user
        newUser
          .save()
          .then(() => res.json('User added!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  });
  
  module.exports = router;