import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function scoutPlayer(player: Player): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this cricket player for a professional scouting report. 
      Name: ${player.name}
      Role: ${player.role}
      Stats: ${JSON.stringify(player.stats)}
      
      Provide a concise 2-sentence professional scouting summary focusing on their potential and key strengths. Maintain a sharp, athletic tone.`,
    });
    return response.text ?? "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to analyze player potential.";
  }
}

export async function generateMatchTips(scenario: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional cricket strategist. Analyze this scenario: ${scenario}
      Provide one innovative tactical tip for the bowling team to break the partnership.`,
    });
    return response.text ?? "Tactical tips unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Strategic analysis failed.";
  }
}
