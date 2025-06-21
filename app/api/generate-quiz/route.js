import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

function cleanJSONResponse(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(request) {
  try {
    const { topic } = await request.json();
    if (!topic) {
      return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }

    const prompt = `
Generate 10 multiple-choice questions on the topic "${topic}".
For each question, provide:
- question (string)
- options (array of 4 strings)
- answer (integer, index 0-3)
- feedback (array of 4 short strings)

Return only valid JSON array.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    const cleanedText = cleanJSONResponse(text);
    const questions = JSON.parse(cleanedText);

    if (!Array.isArray(questions)) {
      throw new Error("Invalid JSON format");
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI generation failed", details: error.message },
      { status: 500 }
    );
  }
}
