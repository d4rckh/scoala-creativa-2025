import type { Context } from "@netlify/functions";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Doar cererile POST sunt permise." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let challengeText: string;

  try {
    const body = await req.json();
    challengeText = body.challengeText;
    if (!challengeText) throw new Error("Missing 'challengeText'");
  } catch {
    return new Response(JSON.stringify({ error: "Corpul cererii trebuie să conțină 'challengeText'." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prompt = `Creează o imagine ilustrativă pentru următoarea provocare legată de alimentație și nutriție: "${challengeText}"`;

  try {
    const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "100x100",
        response_format: "url",
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const result = await imageResponse.json();
    const imageUrl = result.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Netlify-CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=31536000, durable",
        "Netlify-Vary": "query",
      },
    });

  } catch (err) {
    console.error("Eroare OpenAI:", err);
    return new Response(JSON.stringify({ error: "Eroare la generarea imaginii." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
