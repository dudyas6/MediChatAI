import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      await connectToDatabase();
      const user = await User.findOne({ username });

      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, jwtSecret, {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      } else {
        res
          .status(401)
          .json({ error: 'Invalid username or password, please try again.' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

const handlers = {
  POST: login,
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
