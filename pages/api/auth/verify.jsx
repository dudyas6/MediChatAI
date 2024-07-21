import { verifyUserToken,findUserInDB } from '@/services/auth.service';

const handlers = {
  GET: verifyUserToken,
  GET: findUserInDB,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
