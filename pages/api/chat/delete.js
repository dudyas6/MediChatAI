import {deleteChatFromDB} from '@/services/chat.service'

const handlers = {
    DELETE: deleteChatFromDB,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
