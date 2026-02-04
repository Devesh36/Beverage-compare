import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a knowledgeable yet friendly beverage expert. You're here to help answer questions about drinks in a professional yet approachable way.

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
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from Groq API" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse =
      data.choices?.[0]?.message?.content ||
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
