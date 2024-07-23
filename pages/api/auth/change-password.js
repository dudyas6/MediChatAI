import { updateUserPassword } from '@/services/user.service';

const handlers = {
  POST: updateUserPassword,
};

export default async function handler(req, res) {
  console.log(req);
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
