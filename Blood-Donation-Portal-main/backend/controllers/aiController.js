const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * @desc    Chat with AI Assistant
 * @route   POST /api/ai/chat
 * @access  Public
 */
const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        message: 'Message is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: true,
        reply:
          'AI is not configured yet. Please add GEMINI_API_KEY in Render environment variables.'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // Stable Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    // Prepare chat history
    let formattedHistory = [];

    if (Array.isArray(history)) {
      formattedHistory = history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [
          {
            text: msg.text
          }
        ]
      }));
    }

    // Gemini history must start with user message
    while (
      formattedHistory.length > 0 &&
      formattedHistory[0].role === "model"
    ) {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory
    });

    const prompt = `
You are BloodLink AI Assistant.
Help users with blood donation, blood requests, donor information,
eligibility, and emergency guidance.
Be polite and empathetic.

User message:
${message}
`;

    const result = await chat.sendMessage(prompt);

    const responseText = result.response.text();

    return res.status(200).json({
      success: true,
      reply: responseText
    });

  } catch (error) {

    console.error("AI Chat Error Details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText
    });

    return res.status(500).json({
      success: false,
      message:
        "The AI service is currently unavailable. Please check Gemini API configuration.",
      error: error.message
    });
  }
};


module.exports = {
  chatWithAI
};