import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PersonProfile, CompatibilityResult } from "../types";

const apiKey = process.env.API_KEY;

// Define the schema for the structured output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.INTEGER, description: "A compatibility score from 0 to 100 based on Zi Wei Dou Shu." },
    title: { type: Type.STRING, description: "A short, mystical title for the relationship (e.g., 'Karmic Union')." },
    summary: { type: Type.STRING, description: "A 2-sentence summary of the match." },
    personA_analysis: {
      type: Type.OBJECT,
      properties: {
        dominantStar: { type: Type.STRING, description: "The major Zi Wei star (e.g., Zi Wei, Tian Ji, Tan Lang) in English. If birth time is unknown, use the Year Stem star or general archetype." },
        personalityTraits: { type: Type.STRING, description: "Brief personality description based on the star." },
        loveStyle: { type: Type.STRING, description: "How they approach love." }
      },
      required: ["dominantStar", "personalityTraits", "loveStyle"]
    },
    personB_analysis: {
      type: Type.OBJECT,
      properties: {
        dominantStar: { type: Type.STRING, description: "The major Zi Wei star (e.g., Zi Wei, Tian Ji, Tan Lang) in English. If birth time is unknown, use the Year Stem star or general archetype." },
        personalityTraits: { type: Type.STRING, description: "Brief personality description based on the star." },
        loveStyle: { type: Type.STRING, description: "How they approach love." }
      },
      required: ["dominantStar", "personalityTraits", "loveStyle"]
    },
    relationship_dynamics: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 relationship strengths." },
        challenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 relationship challenges." },
        niHaixiaInsight: { type: Type.STRING, description: "Specific advice mimicking Master Ni Haixia's tone (direct, emphasizing fate, karma, and practical reality of the stars)." }
      },
      required: ["strengths", "challenges", "niHaixiaInsight"]
    },
    verdict: { type: Type.STRING, description: "Final recommendation: Highly Recommended, Proceed with Caution, or Not Recommended." }
  },
  required: ["matchScore", "title", "summary", "personA_analysis", "personB_analysis", "relationship_dynamics", "verdict"]
};

export const analyzeCompatibility = async (personA: PersonProfile, personB: PersonProfile): Promise<CompatibilityResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a Grandmaster of Zi Wei Dou Shu (Purple Star Astrology), specifically following the lineage and teaching style of Master Ni Haixia (倪海厦).
    
    Your task is to analyze the romantic compatibility between two people based on their birth data.
    
    Master Ni Haixia's style is direct, practical, and deeply rooted in the interactions of the 14 Major Stars (e.g., Zi Wei, Tian Ji, Tai Yang, Wu Qu, Tian Tong, Lian Zhen, Tian Fu, Tai Yin, Tan Lang, Ju Men, Tian Xiang, Tian Liang, Qi Sha, Po Jun). He emphasizes the "San Fang Si Zheng" (Three Parties and Four Squares) interactions.

    Person A:
    Name: ${personA.name}
    Gender: ${personA.gender}
    Birth Date: ${personA.birthDate}
    Birth Time: ${personA.birthTime || "Unknown"}

    Person B:
    Name: ${personB.name}
    Gender: ${personB.gender}
    Birth Date: ${personB.birthDate}
    Birth Time: ${personB.birthTime || "Unknown"}

    Instructions:
    1. Internally calculate their Lunar birth dates.
    2. If birth time is provided, determine their Life Palace (Ming Gong) and Spouse Palace (Fu Qi Gong) stars accurately.
    3. If birth time is "Unknown", analyze based on Year and Month interactions, general BaZi (Eight Characters) element compatibility, or solar date archetypes, while acknowledging that the specific Palace layout is estimated.
    4. Analyze the interaction between their stars/elements. For example, does a 'Tian Xiang' (General) match well with a 'Lian Zhen' (Chastity/Passion)?
    5. Provide a 'Ni Haixia Insight' that feels authentic to his teaching—mentioning specific star qualities or the inevitability of certain personality clashes/harmonies.
    6. Keep the language accessible to a North American audience but retain the mystical Eastern terminology (translated).
    7. Be honest. If they are not a match, say so respectfully but firmly.

    Output MUST be in valid JSON matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7, // Slightly creative but grounded
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CompatibilityResult;
    } else {
      throw new Error("No response content generated.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return a fallback mock if API fails for demo purposes, or rethrow
    throw error;
  }
};