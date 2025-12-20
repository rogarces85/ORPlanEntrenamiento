
import { GoogleGenAI, Type } from "@google/genai";
import { AthleteData, GeneratedPlanResponse } from '../types';

function createPrompt(data: AthleteData): string {
  const today = new Date().toLocaleDateString('es-CL');
  const prepRacesInfo = data.hasPrepRaces && data.prepRaces.length > 0 
    ? data.prepRaces.map(r => `- ${r.name} (${r.distance}) el día ${r.date}`).join("\n") 
    : "Ninguna";
  
  const techData = data.hasWatch 
    ? `DATOS TÉCNICOS: VO2Max: ${data.vo2Max}, FC Reposo: ${data.restingHr}, FC Max: ${data.maxHr}.` 
    : "El usuario no dispone de sensor de frecuencia cardíaca, usar Escala de Esfuerzo Percibido (RPE 1-10).";

  return `
    Eres el Head Coach Senior de Osorno Runner, experto en fisiología del ejercicio y maratonista de élite.
    Tu misión es diseñar un plan de entrenamiento de ${data.prepWeeks} semanas para un corredor con los siguientes datos:
    
    ATLETA: ${data.name}
    OBJETIVO: ${data.distance} en un tiempo meta de ${data.targetTime}.
    NIVEL: ${data.experience}. Ritmo actual: ${data.currentPace}/km.
    DISPONIBILIDAD: Entrena los días ${data.trainingDaysSpecific.join(', ')}.
    ${techData}
    HITOS: ${prepRacesInfo}.
    LESIONES/SALUD: ${data.healthConditions}. Antecedentes: ${data.injuryHistory}.

    REGLAS DEL PLAN:
    1. Usa la metodología de Joe Friel para periodización.
    2. Si tiene datos de FC, calcula 7 zonas de entrenamiento basadas en LTHR (Umbral de Lactato) estimado.
    3. Incluye sesiones de: Intervalos, Tempo, Rodajes Suaves (Z2), Fondos Largos y Descanso.
    4. El plan debe ser progresivo (regla del 10% de carga).
    5. En la última semana, incluye el mensaje_motivacional más inspirador que puedas redactar.

    IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON definido en el esquema.
  `;
}

export async function generatePlan(data: AthleteData): Promise<GeneratedPlanResponse> {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: createPrompt(data) }] }],
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            physiologicalData: {
              type: Type.OBJECT,
              properties: {
                estimated_lthr: { type: Type.STRING, description: "FC en el umbral de lactato estimada" },
                methodology_explanation: { type: Type.STRING, description: "Explicación breve de las zonas" },
                zones: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      zone: { type: Type.STRING },
                      name: { type: Type.STRING },
                      range: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["zone", "name", "range", "description"]
                  }
                }
              },
              required: ["estimated_lthr", "zones"]
            },
            weeks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  semana: { type: Type.INTEGER },
                  resumen_semanal: { type: Type.STRING },
                  mensaje_motivacional: { type: Type.STRING },
                  dias: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        dia: { type: Type.STRING },
                        tipo_sesion: { type: Type.STRING },
                        descripcion_detallada: { type: Type.STRING }
                      },
                      required: ["dia", "tipo_sesion", "descripcion_detallada"]
                    }
                  }
                },
                required: ["semana", "resumen_semanal", "dias"]
              }
            }
          },
          required: ["weeks"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("La IA no generó contenido.");
    
    return JSON.parse(resultText) as GeneratedPlanResponse;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("API_KEY_INVALID");
    }
    if (error.message?.includes('429')) {
      throw new Error("API_QUOTA_EXCEEDED");
    }
    
    throw new Error("Error técnico al conectar con el Coach IA. Por favor, intenta de nuevo.");
  }
}
