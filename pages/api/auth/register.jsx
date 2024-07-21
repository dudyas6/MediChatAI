import { addUserToDB } from '@/services/auth.service'

const handlers = {
  POST: addUserToDB,
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
