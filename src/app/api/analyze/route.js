export const maxDuration = 60; // Allow longer execution
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const formData = await req.formData();

    console.log(formData, "check formdata");
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key not configured" },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");

    const prompt = `You are an expert technical recruiter and ATS system.
Analyze the following resume and return ONLY a valid JSON object matching this schema exactly:
{
  "score": number (0-100),
  "summary": "1-2 sentence overview of their resume quality",
  "strengths": ["array of 2-4 strings"],
  "weaknesses": ["array of 2-4 strings outlining formatting or content issues"],
  "suggestions": ["array of 3-5 specific, actionable improvement suggestions"]
}
Limit your response to ONLY the raw JSON object. Do not wrap in markdown \`\`\`json blocks.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: file.type, // should be "application/pdf"
          },
        },
      ],
      config: {
        temperature: 0.1,
      },
    });

    let rawText = response.text || "";
    if (rawText.startsWith("```json")) {
      rawText = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
    } else if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```/g, "").trim();
    }

    const parsedJSON = JSON.parse(rawText);

    return NextResponse.json(parsedJSON);
  } catch (err) {
    console.error("Analysis API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
