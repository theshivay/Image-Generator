import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: "2023-06-01-preview",
  deployment: "dall-e-2"
});

const prompt = "a monkey eating a banana";

async function main() {
  try {
    const result = await client.images.generate({
      prompt,
      n: 1,
      size: "1024x1024"
    });
    console.log(result.data[0].url);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();