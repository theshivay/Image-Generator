import * as dotenv from "dotenv";
import {createError} from "../error.js";
// import { Configuration, OpenAIApi } from "openai";
import { OpenAIApi } from "openai";
import { response } from "express";

dotenv.config();


// Setup for OpenAI Key
// const configuration = new Configuration({
//     apiKey : process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

//Controller to generate image
export const generateImage = async (req,res,next) =>{
    try {
        const {prompt} = req.body;

        const response = await openai.createImage({
            prompt,
            n:1,
            size:"1024x1024",
            response_formate: "b64json",
        })

        const generateImage = response.data.data[0].b64_json;
        return res.status(200).json({photo:generateImage})

    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error?.message));
    }
}