import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json('Successfully registered!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

const handlers = {
  POST: register,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
