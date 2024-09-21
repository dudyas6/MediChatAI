import ContactReport from 'backend/models/contact.model';
import { connectToDatabase } from '@/api-lib/mongodb';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
export const addContactReportToDB = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await connectToDatabase();
    const existingContact = await ContactReport.findOne({ message });
    if (existingContact) {
      return res.status(400).json({
        error: "This message has already been sent, We'll be in touch soon!",
      });
    }
    const report = new ContactReport({ name, email, message });
    await report.save();
    res.status(200).json('Message sent successfully!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

//Sending a reset password link
export const sendResetPasswordEmail = async (req, res) => {
  const { username, to, subject } = req.body;
  const token = jwt.sign({ username: username }, jwtSecret, {
    expiresIn: '1h',
  });
  const resetURL = `https://medichat-staging.vercel.app/reset-password/${username}_${token}`;

  let text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link, or paste this into your browser to complete the process:\n\n
  ${resetURL}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "noreply@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error sending email', details: error.message });
  }
};

export const deleteContactFromDB = async (req, res) => {
  try {
    await connectToDatabase();
    const existingContact = await ContactReport.findOne("randommessage");
    if (existingContact) {
      await existingContact.deleteOne();
    }
  } catch (err) {
    return err;
  }
};
