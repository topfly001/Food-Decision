import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, Ingredient, SearchResultCandidate, Language } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

// 1. Generate Shopping List based on multiple items
export const generateShoppingListAI = async (items: FoodItem[], lang: Language): Promise<Ingredient[]> => {
  const ai = getAiClient();
  
  const prompt = `
    Create a consolidated shopping list for the following dishes. 
    Combine similar ingredients (e.g., if one dish needs 2 eggs and another needs 3 eggs, list 5 eggs).
    Return ONLY a JSON array of objects with "name" and "amount".
    Important: Return the ingredient names in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
    
    Dishes:
    ${items.map(i => `${i.name}: ${JSON.stringify(i.ingredients)}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.STRING }
                }
            }
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as Ingredient[];
    }
    return [];
  } catch (error) {
    console.error("Error generating shopping list:", error);
    // Fallback: just concat standard ingredients
    return items.flatMap(i => i.ingredients);
  }
};

// 2. Search for Alternatives (Grounding)
export const searchFoodAlternatives = async (query: string, lang: Language): Promise<SearchResultCandidate[]> => {
    const ai = getAiClient();
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Find 3 distinct recipes for "${query}" using Google Search. 
        For each, provide a descriptive title, a short snippet of the cooking method, the source URL, and if available, a high-quality image URL from the search result.
        The content (title, snippet) MUST be in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
        
        Output the result strictly as a valid JSON array of objects with keys: "title", "snippet", "sourceUrl", "imageUrl".
        Do not use Markdown formatting or code blocks. Just return the raw JSON string.`,
        config: {
          tools: [{ googleSearch: {} }],
          // responseMimeType: 'application/json' is NOT supported with googleSearch tools
        },
      });
  
      let text = response.text;
      if (!text) return [];
      
      // Clean up markdown if present
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const candidates = JSON.parse(text) as SearchResultCandidate[];
      return candidates;

    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  // 3. Generate Full Food Details from a Candidate
  export const generateFoodFromCandidate = async (candidate: SearchResultCandidate, lang: Language): Promise<Partial<FoodItem>> => {
    const ai = getAiClient();
    
    const prompt = `
      Based on this dish: "${candidate.title}" and description: "${candidate.snippet}",
      generate a structured recipe, list of ingredients, and tags.
      Source URL: ${candidate.sourceUrl}
      
      The output content MUST be in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
      Return JSON.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING },
                    recipe: { type: Type.STRING, description: "Markdown formatted instructions" },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                amount: { type: Type.STRING }
                            }
                        }
                    },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });

    if(response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("Failed to generate details");
  }