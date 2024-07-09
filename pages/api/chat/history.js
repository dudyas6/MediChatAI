import { handleAddChatHistory, handleGetChatHistory } from '@/services/chat.service'

const handlers = {
  POST: handleAddChatHistory,
  GET: handleGetChatHistory,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
