import { updateUserPassword,verifyResetToken } from '@/services/user.service';

const handlers = {
  PATCH: updateUserPassword,
  POST: verifyResetToken
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
