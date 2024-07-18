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
      res.status(200).json('User details updated successfully!');
    } else {
      res.json('Internal error, please try again later.');
    }
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};
