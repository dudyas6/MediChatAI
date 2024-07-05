import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';
import jwt from 'jsonwebtoken';

const jwtSecret = 'jwt_secret';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
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
      res.status(401).json({ error: 'Not authorized' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
