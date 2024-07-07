import { connectToDatabase } from '@/api-lib/mongodb';
import { logout } from '@/services/auth.service';
import User from 'backend/models/user.model';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const verifyUser = async (req, res) => {
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
      logout();
    }
    res.status(401).json({ err });
  }
};

const handlers = {
  GET: verifyUser,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
