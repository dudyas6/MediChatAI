import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const verifyUserAndSetToken = async (req, res) => {
  const { username, password } = req.body;
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: username });

    if (user && (await user.matchPassword(password))) {
      await setUserJwtToken(user, res);
    } else {
      res
        .status(401)
        .json({ error: 'Invalid username or password, please try again.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addUserToDB = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(200).json('Successfully registered!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

export const verifyUserToken = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    await connectToDatabase();
    const user = await User.findById(decoded.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ err });
  }
};

// Helper Functions
const setUserJwtToken = async (user, res) => {
  try {
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: '12h',
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
