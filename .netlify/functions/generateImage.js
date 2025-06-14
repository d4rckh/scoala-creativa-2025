// netlify/functions/generateImage.js

const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Doar cererile POST sunt permise." }),
    };
  }

  try {
    const { challengeText } = JSON.parse(event.body);

    if (!challengeText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Parametrul 'challengeText' este obligatoriu." }),
      };
    }

    // 🧠 Romanian Prompt
    const prompt = `Creează o imagine reprezentativă pentru provocarea legată de alimentație și nutriție: "${challengeText}"`;

    const imageResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "url",
    });

    const imageUrl = imageResponse.data.data[0].url;

    return {
      statusCode: 200,
      headers: {
        // ♾️ Cache forever in Netlify's durable cache
        'Netlify-CDN-Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=31536000, durable',
        // Ensure Netlify varies cache by full query
        'Netlify-Vary': 'query',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl }),
    };

  } catch (error) {
    console.error("Eroare la generarea imaginii:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Eroare internă la generarea imaginii." }),
    };
  }
};
