import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are an expert resume writer.
Enhance the following experience bullet points to be highly professional, impactful, and use strong action verbs.
Use the XYZ format where possible: "Accomplished [X] as measured by [Y], by doing [Z]".
Do NOT return conversational text or markdown headings. ONLY return the enhanced bullet points formatted cleanly.

Original text:
${text}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });

    let enhanced = response.text || "";
    enhanced = enhanced.trim();

    return NextResponse.json({ enhanced });
  } catch (err) {
    console.error("Enhance API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
