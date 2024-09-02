import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from 'openai';

dotenv.config();

// Setup for OpenAI Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate image
export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        
        const response = await openai.images.generate({
            model: "dall-e-2",  // or "dall-e-3" if you have access
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const generatedImage = response.data[0].b64_json;
        return res.status(200).json({ photo: generatedImage });

    } catch (error) {
        console.error('Error generating image:', error);
        
        if (error.error?.code === 'billing_hard_limit_reached') {
            return res.status(503).json({
                error: "Service temporarily unavailable due to usage limits. Please try again later."
            });
        }
        next(createError(error.status || 500, error?.response?.data?.error?.message || error?.message));
    }
};