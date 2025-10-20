
import { GoogleGenAI, Type } from "@google/genai";
import { GeneAIResponse } from "../types";

const MOCK_USER_DATA = {
  age: 34,
  gender: "Female",
  weight: "145 lbs",
  height: "5'7\"",
  activityLevel: "Moderately Active (3-5 days/week)",
  geneticMarkers: [
    "APOE e4 allele: Negative",
    "MTHFR C677T: Heterozygous",
    "FTO gene variant: Present"
  ],
  healthGoals: "Weight management and improved cardiovascular health."
};

export const getPersonalizedInsights = async (): Promise<GeneAIResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as GeneAI, a personalized health insights platform. Based on the following user data, generate a complete, JSON-formatted health and wellness plan.

    User Data:
    - Age: ${MOCK_USER_DATA.age}
    - Gender: ${MOCK_USER_DATA.gender}
    - Weight: ${MOCK_USER_DATA.weight}
    - Height: ${MOCK_USER_DATA.height}
    - Activity Level: ${MOCK_USER_DATA.activityLevel}
    - Key Genetic Markers: ${MOCK_USER_DATA.geneticMarkers.join(", ")}
    - Health Goals: ${MOCK_USER_DATA.healthGoals}

    Your response MUST be a single, valid JSON object that adheres exactly to the provided schema. Do not include any introductory text, explanations, or markdown formatting outside of the JSON structure.

    Generate the following:
    1.  **healthScore**: A score from 0 to 100 representing overall health.
    2.  **healthSummary**: A brief, encouraging paragraph summarizing their current health status.
    3.  **preventiveTips**: An array of 3 short, actionable tips.
    4.  **risks**: An array of 3 health risks (e.g., 'Cardiovascular', 'Metabolic', 'Inflammation'), each with a level ('Low', 'Medium', 'High') and a brief explanation.
    5.  **mealPlan**: A daily meal plan with breakfast, lunch, and dinner. Each meal should have a name, description, calorie count, and macros (protein, carbs, fat in grams).
    6.  **workoutPlan**: A recommended workout for the day with a name ('Cardio', 'Strength Training', 'Flexibility', 'Rest Day'), duration, intensity, and details.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      healthScore: { type: Type.INTEGER, description: "Overall health score from 0 to 100." },
      healthSummary: { type: Type.STRING, description: "A brief summary of the user's health." },
      preventiveTips: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "An array of three actionable health tips."
      },
      risks: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            level: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Very High'] },
            explanation: { type: Type.STRING }
          },
          required: ['name', 'level', 'explanation']
        }
      },
      mealPlan: {
        type: Type.OBJECT,
        properties: {
          breakfast: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              calories: { type: Type.INTEGER },
              macros: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING }
                },
                required: ['protein', 'carbs', 'fat']
              }
            },
            required: ['name', 'description', 'calories', 'macros']
          },
          lunch: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              calories: { type: Type.INTEGER },
              macros: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING }
                },
                required: ['protein', 'carbs', 'fat']
              }
            },
            required: ['name', 'description', 'calories', 'macros']
          },
          dinner: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              calories: { type: Type.INTEGER },
              macros: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING }
                },
                required: ['protein', 'carbs', 'fat']
              }
            },
            required: ['name', 'description', 'calories', 'macros']
          },
        },
        required: ['breakfast', 'lunch', 'dinner']
      },
      workoutPlan: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, enum: ["Cardio", "Strength Training", "Flexibility", "Rest Day"] },
          duration: { type: Type.STRING },
          intensity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          details: { type: Type.STRING }
        },
        required: ['name', 'duration', 'intensity', 'details']
      }
    },
    required: ['healthScore', 'healthSummary', 'preventiveTips', 'risks', 'mealPlan', 'workoutPlan']
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneAIResponse;
  } catch (error) {
    console.error("Error generating insights from Gemini:", error);
    throw new Error("Failed to fetch personalized health insights. Please try again later.");
  }
};
