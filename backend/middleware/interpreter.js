import OpenAI from 'openai';

export const sendMessageToAPI = async (req, res) => {
  const message = req.body.message;
  const user = req.body.currentUser;
  const medicalHistoryString = JSON.stringify(user.medical, null, 2);
  const chatFilter = `You are a Medical assisant bot.
    you have access to a medical profile of the user, here is the profile: ${medicalHistoryString}.
    Answer only medical related subjects and give simple answers using simple words.`;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     { role: 'system', content: chatFilter },
    //     { role: 'user', content: message },
    //   ],
    // });

    // const reply = response.choices[0].message.content;
    const reply = 'This is a reply from the API';
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
