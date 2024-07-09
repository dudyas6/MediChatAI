import { connectToDatabase } from '@/api-lib/mongodb';
import { addContactReportToDB } from '@/services/contact.service';

const handlers = {
  POST: addContactReportToDB,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
