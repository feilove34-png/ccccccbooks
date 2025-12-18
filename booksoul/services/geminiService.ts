import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BookAnalysis } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The normalized title of the book." },
    author: { type: Type.STRING, description: "The normalized name of the author." },
    quotes: {
      type: Type.ARRAY,
      description: "A list of 3 to 5 most famous and impactful quotes (Golden Sentences) from the book.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The exact quote text in the original language (or Chinese translation if requested)." },
          sentiment: { type: Type.STRING, description: "A 2-4 character mood tag for this quote (e.g., 哲理, 悲伤, 励志)." },
          context: { type: Type.STRING, description: "Brief context of where or why this quote appears (1 sentence)." }
        },
        required: ["text", "sentiment"]
      }
    },
    summary: { type: Type.STRING, description: "A concise 100-word summary of the book." },
    extendedInterpretation: { 
      type: Type.STRING, 
      description: "A deep, literary interpretation of the book's themes, symbolism, and cultural impact. Should be about 300-500 words. Return as plain text with paragraph breaks." 
    },
    mindMap: {
      type: Type.OBJECT,
      description: "A hierarchical structure representing the book's content (e.g., Main Themes > Sub-themes > Details).",
      properties: {
        label: { type: Type.STRING, description: "Root node, usually the Book Title" },
        children: {
          type: Type.ARRAY,
          description: "4-6 Main branches (Major Themes or Key Chapters)",
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              children: {
                type: Type.ARRAY,
                description: "2-4 Sub-branches (Key points or specific details)",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  required: ["title", "author", "quotes", "summary", "extendedInterpretation", "mindMap"]
};

export const generateBookAnalysis = async (bookTitle: string, authorName: string): Promise<BookAnalysis> => {
  try {
    const prompt = `
      Please analyze the book "${bookTitle}" by author "${authorName}".
      The user speaks Chinese, so please provide the output content in Simplified Chinese (zh-CN).
      
      Tasks:
      1. Identify 3-5 of the most famous "Golden Quotes" (金句) from this specific book.
      2. Provide a concise summary.
      3. Write an extended interpretation (延伸解读) that analyzes the core themes, the author's intent, and the value of reading this book today.
      4. Create a "Mind Map" structure (思维导图) that breaks down the book into its core structure. 
         - Root: Book Title
         - Level 1: 4-6 Main Themes or Structural Parts.
         - Level 2: 2-4 Key details for each main theme.
      
      Ensure the tone is literary, elegant, and insightful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7, // Slightly creative but grounded
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text) as BookAnalysis;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};