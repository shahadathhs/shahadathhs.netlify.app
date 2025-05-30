import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // 1) create a new chat session
  const chat = await ai.chats.create({
    model: "gemini-2.0-flash",
    config: {
      temperature: 0.5,
      maxOutputTokens: 1024,
    },
    history: [
      {
        parts: [
          {
            text: "You are Sajib’s friendly portfolio assistant. Answer questions about his skills, projects, and background.",
          },
        ],
        role: "model", // * user or model
      },
    ],
  });

  // 2) send the user’s question and wait for the model response
  const resp = await chat.sendMessage({ message: question });
  // ‣ each `resp` has a `candidates` array; take the first candidate
  const content = resp.candidates?.[0]?.content;

  // 3) pull out the text from the first part
  const answer =
    content?.parts?.[0]?.text ?? "Sorry, I couldn't generate an answer.";

  // 4) return it
  return NextResponse.json({ answer });
}
