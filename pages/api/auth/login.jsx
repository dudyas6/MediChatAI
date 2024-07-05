import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';
import jwt from 'jsonwebtoken';

const jwtSecret = 'jwt_secret';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      await connectToDatabase();
      const user = await User.findOne({ username });

      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password, please try again.' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
