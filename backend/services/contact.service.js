import ContactReport from 'backend/models/contact.model';
import { connectToDatabase } from '@/api-lib/mongodb';
import nodemailer from 'nodemailer';

export const addContactReportToDB = async (req, res) => {
    const { name, email, message } = req.body;
    try {
      await connectToDatabase();
      const existingContact = await ContactReport.findOne({ message });
      if (existingContact) {
        
        return res
          .status(400)
          .json({
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
export const sendResetPasswordEmail = async (req,res) => {;
  if (req.method === 'POST') {
    const {to, subject, text,html } = req.body;
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
          user: 'medichatproject@outlook.com', // Your email address
          pass: 'medi1234 ' // Your password
        }
      });
      console.log(to);
    // Define email options
    let mailOptions = {
      from: "medichatproject@outlook.com",
      to: req.body.to,
      subject,
      text,
      html,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
};