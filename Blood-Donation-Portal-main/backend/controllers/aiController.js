const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * @desc    Chat with AI Assistant
 * @route   POST /api/ai/chat
 * @access  Public
 */
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        success: true,
        reply: "AI is not configured. Please add GEMINI_API_KEY."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // Working model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });


    const prompt = `
You are BloodLink AI Assistant.

Help users with:
- Blood donation
- Blood requests
- Donor registration
- Emergency blood information

Be polite and helpful.

User message:
${message}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();


    res.status(200).json({
      success: true,
      reply
    });


  } catch (error) {

    console.error("AI Chat Error:", error.message);


    // Handle quota error
    if (error.message.includes("429")) {
      return res.status(200).json({
        success: true,
        reply:
        "AI service limit reached currently. Please try again later."
      });
    }


    res.status(500).json({
      success:false,
      message:"AI service unavailable",
      error:error.message
    });

  }
};


module.exports = {
  chatWithAI
};