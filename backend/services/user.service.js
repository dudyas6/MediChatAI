import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';

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

export const findUserInDB = async (req, res) => {
  const username = req.query.username;
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUserPassword = async () =>{
  console.log("GOT TO THE SERVICE!");
  const {username,newPassword} = req.body;
  console.log("user-service update pass- "+username);
}
