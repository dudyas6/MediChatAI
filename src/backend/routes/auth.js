const router = require("express").Router();
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "jwt_secret";


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user already exists by username or email
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }

    // Create the new user
    const newUser = new User({
      username,
      password,
    });

    // Save the new user to the database
    await newUser.save();
    res.json('Successfully registered!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
});

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("DECODED");
    console.log(decoded);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized' });
  }
};

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    console.log("BACKEND USER");
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
