import OpenAI from 'openai';

let cachedClient = null;

export async function getOpenAIConnection() {
    if (cachedClient) {
        return cachedClient;
    }
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('Creating OpenAI Session');
    cachedClient = openai;
    return openai;
}
