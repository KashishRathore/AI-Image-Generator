// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import { Configuration, OpenAIApi } from "openai";
// 
// dotenv.config();
// 
// // Setup open ai api key
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// 
// // Controller to generate Image
// 
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;
// 
//     const response = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const generatedImage = response.data.data[0].b64_json;
//     return res.status(200).json({ photo: generatedImage });
//   } catch (error) {
//     next(
//       createError(
//         error.status,
//         error?.response?.data?.error?.message || error?.message
//       )
//     );
//    }
//  };


import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Setup Google Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Function to generate an image using the Gemini API
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;  // Receive the prompt from the frontend

    // Get the image generation model (adjust as per Gemini API)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });  // Assuming this is the image generation model

    // Generate the image based on the prompt
    const result = await model.generateContent(prompt);

    // Check the response structure for base64 image data
    const base64Image = result.response.candidates[0]?.content?.parts[0]?.text;  // Modify based on the actual response format

    if (!base64Image) {
      return res.status(500).json({ error: "Image data not found in the response" });
    }

    // Return the base64 image as a response
    return res.status(200).json({ image: base64Image });

  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({
      error: error.response?.data?.message || error.message || "An error occurred while generating the image",
    });
  }
};
