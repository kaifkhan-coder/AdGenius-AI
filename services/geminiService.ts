
import { GoogleGenAI, Type } from "@google/genai";
import { AdCampaign, AdCopy } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateAdCopy(campaign: AdCampaign): Promise<AdCopy[]> {
    const prompt = `
      Create 3 high-converting social media ad copy variations for ${campaign.platform}.
      Brand: ${campaign.brandName}
      Product: ${campaign.productDescription}
      Goal: ${campaign.goal}
      Audience: ${campaign.targetAudience}
      Tone: ${campaign.tone}

      Ensure the copy matches the platform's standard style (e.g., short & punchy for TikTok, professional for LinkedIn).
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              body: { type: Type.STRING },
              cta: { type: Type.STRING },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["headline", "body", "cta", "hashtags"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse ad copy JSON", e);
      return [];
    }
  }

  async generateAdImage(campaign: AdCampaign): Promise<string | null> {
    const prompt = `A professional high-quality advertisement visual for ${campaign.brandName}. Product: ${campaign.productDescription}. 
    The image should be optimized for ${campaign.platform} advertising. Cinematic lighting, professional product photography style, clean background.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: campaign.platform === 'tiktok' || campaign.platform === 'instagram' ? "9:16" : "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  }
}

export const geminiService = new GeminiService();
