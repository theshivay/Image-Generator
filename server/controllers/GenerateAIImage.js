import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { AzureOpenAI } from "openai";  // Import the AzureOpenAI package

dotenv.config();

// Setup for Azure OpenAI
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-04-15"; // Specify API version
const deploymentName = "dall-e-2"; // Specify deployment name

// Create a function to initialize the Azure OpenAI client
function getClient() {
    return new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
    });
}

// Controller to generate image using Azure OpenAI
export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // Initialize the Azure OpenAI client
        const client = getClient();

        // Call the image generation method from Azure OpenAI
        const results = await client.images.generate({
            prompt,
            size: "1024x1024",
            n: 1,
            style: "vivid", // Optional style, can also be "natural"
        });

        // Assuming results.data contains the generated image URLs
        const generatedImage = results.data[0].url;
        
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


// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// // import { OpenAI } from 'openai';
// import pkg from 'openai';
// const { OpenAI } = pkg;

// dotenv.config();

// // Setup for OpenAI Key
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// // Controller to generate image
// export const generateImage = async (req, res, next) => {
//     try {
//         const { prompt } = req.body;
        
//         const response = await openai.images.generate({
//             model: "dall-e-2",  // or "dall-e-3" if you have access
//             prompt: prompt,
//             n: 1,
//             size: "1024x1024",
//             response_format: "b64_json",
//         });

//         const generatedImage = response.data[0].b64_json;
//         return res.status(200).json({ photo: generatedImage });

//     } catch (error) {
//         console.error('Error generating image:', error);
        
//         if (error.error?.code === 'billing_hard_limit_reached') {
//             return res.status(503).json({
//                 error: "Service temporarily unavailable due to usage limits. Please try again later."
//             });
//         }
        
//         next(createError(error.status || 500, error?.response?.data?.error?.message || error?.message));
//     }
// };