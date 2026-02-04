import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const { beverages } = await request.json();

    if (!beverages || beverages.length < 2) {
      return NextResponse.json(
        { error: "At least 2 beverages are required" },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const beverageList = beverages.join(", ");
    const beverageCount = beverages.length;
    const beverageColumns = beverages.map((b: string, i: number) => `Beverage ${i + 1}: ${b}`).join("\n");

    const prompt = `You are a beverage comparison expert in India. Compare these ${beverageCount} drinks:
${beverageColumns}

Create a detailed comparison table. Format as a pipe-separated table with ${beverageCount} beverage columns.

Structure:

Attribute | ${beverages.join(" | ")}
Type | [types for each]
Price (750ml) | [prices in ₹ for each]
Price (350ml) | [prices in ₹ for each]
ABV | [alcohol content for each]
Taste Profile | [taste descriptions for each]
Origin | [country/region for each]
Best For | [usage recommendations for each]
Quality Tier | [quality level for each]
Value for Money | [rating for each]

FOLLOWED BY:

KEY STRENGTHS:
[List unique strengths of each beverage]

WEAKNESSES:
[List unique weaknesses of each beverage]

OVERALL WINNER & RECOMMENDATIONS:
[Based on price, taste, value - which is best and for what use case]

Keep it concise, factual, and easy to compare. Use latest November 2025 India prices.`;

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
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
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
    const comparison =
      data.choices?.[0]?.message?.content ||
      "Unable to get comparison";

    return NextResponse.json({ comparison });
  } catch (error) {
    console.error("Compare API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
