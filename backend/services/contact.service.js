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
  const token = jwt.sign({username: username}, jwtSecret, {
    expiresIn: '1h',
  });
  const resetURL = `http://localhost:3000/resetpassword/username=${username}`;

  let text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link, or paste this into your browser to complete the process:\n\n
  ${resetURL}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`;
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'medichatproject@outlook.com',
      pass: 'medi1234',
    },
  });

  let mailOptions = {
    from: 'medichatproject@outlook.com',
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
