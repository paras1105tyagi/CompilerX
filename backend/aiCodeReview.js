const dotenv = require("dotenv");
const {GoogleGenAI} = require("@google/genai");
dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const aiCodeReview = async(code) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Analyse the following code and provide a short and concise review. Code: ${code} `,
    });
    // console.log(response.text);
    return response.text;
}

module.exports={
aiCodeReview,
} 