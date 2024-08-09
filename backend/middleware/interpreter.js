import OpenAI from 'openai';

export const sendMessageToAPI = async (req, res) => {
  const user = req.body.currentUser;
  const currentMessage = req.body.message;
  const chatHistory = JSON.stringify(req.body.currentSession.messages, null, 2);
  const chatFilter = generateChatFilter(user, chatHistory, currentMessage);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: chatFilter },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    // const reply = 'This is a reply from the API';
    // Check if the response and choices array are defined
    res.json({ reply });
  } catch (error) {
    // Log detailed error information
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
      This is the user's current message: ${currentMessage}.
      Give simple and clear responses.
    `;
  } else {
    const medicalHistoryString = JSON.stringify(user.medical, null, 2);
    const personalDetailsString = JSON.stringify(user.details, null, 2);
    chatFilter = `
      You are a Medical Assistant bot.
      You have access to the user's medical profile. Here is the profile: ${medicalHistoryString}.
      Here is the user's personal information: ${personalDetailsString}.
      This is the whole conversation up until now: ${chatHistory}.
      This is the user's current message: ${currentMessage}.
      Answer only medical-related subjects and give simple answers using simple words and accessible information.
    `;
  }

  return chatFilter.trim(); // Removes any extra whitespace
}
