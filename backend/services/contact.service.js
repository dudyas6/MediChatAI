import ContactReport from 'backend/models/contact.model';
import { connectToDatabase } from '@/api-lib/mongodb';
import nodemailer from 'nodemailer';

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
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
      user: 'medichatproject@outlook.com',
      pass: 'medi1234 ',
    },
  });

  let mailOptions = {
    from: 'medichatproject@outlook.com',
    to: to,
    subject,
    text,
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
