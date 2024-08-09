import OpenAI from 'openai';

export const sendMessageToAPI = async (req, res) => {
  const user = req.body.currentUser;
  const messages = req.body.currentSession.messages;
  const currentMessage = req.body.message;
  let chatFilter;
  if (!user) {
    chatFilter = `You are a Medical assisant bot.
    you do not have the user medical history,
    this is the whole conversation untill now : ${messages}
    And this is the users current message : ${currentMessage}
    give simple and clear responses. `;
  } else {
    const medicalHistoryString = JSON.stringify(user.medical, null, 2);
    const personalDetailsString = JSON.stringify(user.details, null, 2);
    const messagesAsString = JSON.stringify(messages, null, 2);
    chatFilter = `You are a Medical assisant bot.
    you have access to a medical profile of the user, here is the profile: ${medicalHistoryString}.
    And here is the user's personal information : ${personalDetailsString}.
    And this is the whole conversation untill now : ${messagesAsString}
    And this is the users current message : ${currentMessage}
    Answer only medical related subjects and give simple answers using simple words and accesible information.`;
  }
  console.log('Chat Filter:', chatFilter);
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
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
