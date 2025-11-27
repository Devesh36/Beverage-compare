import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Call Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a knowledgeable yet friendly beverage expert. You're here to help answer questions about drinks in a professional yet approachable way.

User Question: ${message}

Guidelines:
- Answer the user's question directly and thoroughly
- Be professional but conversational - like chatting with a knowledgeable friend
- Use a friendly tone with casual language when appropriate
- For drink prices: Show common bottle sizes (750ml/350ml/180ml/90ml) with ₹ prices and note that prices may vary
- For comparisons: Highlight key differences, taste profiles, alcohol content, and value
- For recommendations: Suggest based on the user's preferences or occasion
- Keep responses clear and helpful without being too formal
- Feel free to use emojis sparingly to keep it engaging 🍻

Focus on giving practical, honest information that answers what they're asking.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from Gemini API" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that request.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
