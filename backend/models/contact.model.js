import mongoose from 'mongoose';

const ContactReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.models.ContactReport || mongoose.model('ContactReport', ContactReportSchema);
