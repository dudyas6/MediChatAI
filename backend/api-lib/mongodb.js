import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://root:root@medichatdb.ut4vxly.mongodb.net/MediChatDB';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}
