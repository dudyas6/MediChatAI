import { getOpenAIConnection } from '@/api-lib/openai'

export const sendMessageToAPI = async (req, res) => {
  const user = req.body.currentUser;
  const currentMessage = req.body.message;
  const chatHistory = JSON.stringify(req.body.currentSession.messages, null, 2);
  const chatFilter = generateChatFilter(user, chatHistory, currentMessage);

  try {
    const openai = await getOpenAIConnection(); // Await the promise

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: chatFilter },
        { role: 'user', content: currentMessage },
      ],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(
      'Error details:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Error communicating with OpenAI API' });
  }
};

function generateChatFilter(user, chatHistory, currentMessage) {
  let chatFilter;
  if (!user) {
    chatFilter = `
      You are a Medical Assistant bot.
      You do not have the user's medical history as this is a guest user.
      You can recommend the user to register for better assistance once the conversation is done.
      This is the whole conversation up until now: ${chatHistory}.

      Give simple and clear responses.
    `;
    // This is the user's current message: ${currentMessage}.
  } else {
    const medicalHistoryString = JSON.stringify(user.medical, null, 2);
    const personalDetailsString = JSON.stringify(user.details, null, 2);
    chatFilter = `
      You are a Medical Assistant bot.
      You have access to the user's medical profile. Here is the profile: ${medicalHistoryString}.
      Here is the user's personal information: ${personalDetailsString}.
      This is the whole conversation up until now: ${chatHistory}.
      Answer only medical-related subjects and give simple answers using simple words and accessible information.
    `;
    // This is the user's current message: ${currentMessage}.

  }

  return chatFilter.trim(); // Removes any extra whitespace
}