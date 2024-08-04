import OpenAI from "openai";

export const sendMessageToAPI = async (req, res) => {
    const message = req.body.message;
    const user = req.body.currentUser;
    const medicalHistory = user.medical_details;
    const medicalHistoryString = JSON.stringify(medicalHistory, null, 2);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    // console.log(`You are a Medical assisant bot. Answer only medical related subjects and consider the user's medical profile: ${medicalHistory}`)
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: `You are a Medical assisant bot. Answer only medical related subjects and consider the user's medical profile: ${medicalHistoryString} and answer as simple and clear as possible, use simple words`}
                      ,{ role: "user", content: message }],
        });

        // Log the entire response for debugging
        const reply = response.choices[0].message.content;
        // Check if the response and choices array are defined
        res.json({ reply });
    } catch (error) {
        // Log detailed error information
        console.error("Error details:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error communicating with OpenAI API" });
    }
};
