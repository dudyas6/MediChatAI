import { connectToDatabase } from '@/api-lib/mongodb';
import ContactReport from 'backend/models/contact.model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await connectToDatabase();
      const existingContact = await ContactReport.findOne({ message });

      if (existingContact) {
        return res.status(400).json({ error: "This message has already been sent, We'll be in touch soon!" });
      }

      const report = new ContactReport({ name, email, message });
      await report.save();
      res.status(200).json('Message sent successfully!');
    } catch (err) {
      res.status(500).json('Error: ' + err.message);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
