import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
export const updateUserDetails = async (req, res) => {
  const { currentUser, formData } = req.body;
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: currentUser.username });
    if (user) {
      user.details = { ...user.details.toObject(), ...formData };

      await user.save();

      res.status(200).json(user);
    } else {
      res.json('Internal error, please try again later.');
    }
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

export const updateMedicalUserDetails = async (req, res) => {
  const { currentUser, formData } = req.body;
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: currentUser.username });
    if (user) {
      user.medical = { ...user.medical.toObject(), ...formData };
      await user.save();
      res.status(200).json(user);
    } else {
      res.json('Internal error, please try again later.');
    }
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

export const findUserInDB = async (req, res) => {
  const username = req.query.username;
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: username });
    if(user==null)
      res.status(400).json({ error: err.message });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUserPassword = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    await connectToDatabase();

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Error: ' + err.message });
  }
};

export const verifyResetToken = (req,res) =>{
  const token = req.body.token;
  try{
    jwt.verify(token, jwtSecret);
  }
  catch(error){//invalid sign
   res.status(500).json(error);
  }
}


