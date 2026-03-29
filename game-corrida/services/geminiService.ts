
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiCoachAdvice = async (stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an AI Battle Commander for a fitness game called TerraQuest. 
      The user has level ${stats.level}, ${stats.territories} territories, and total distance ${stats.distance}km.
      Give a short, motivating, 2-sentence tactical advice for their next run to conquer more land. 
      Be competitive but encouraging.`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Coach Error:", error);
    return "Commander, the fog of war is thick today. Keep moving to secure the perimeter!";
  }
};
