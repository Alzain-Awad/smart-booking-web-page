import { GoogleGenAI } from "@google/genai";
import { AccessLog, Branch, Device } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeSecurityLogs = async (logs: AccessLog[], branches: Branch[]) => {
  const ai = getAiClient();
  if (!ai) return "AI Configuration Missing: Please set API_KEY.";

  const prompt = `
    You are a security expert for a multi-branch facility management system.
    Here is a summary of recent access logs and branch status.
    
    Branches: ${JSON.stringify(branches.map(b => ({ name: b.name, status: b.status })))}
    Recent Logs: ${JSON.stringify(logs.slice(0, 20))}

    Please provide a short, actionable security briefing in Markdown format.
    1. Identify any anomalies (e.g., denied access, tailgating, offline branches).
    2. Suggest 1 immediate action for the administrator.
    3. Keep it professional and concise (under 150 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Unable to generate security analysis at this time. Please try again later.";
  }
};

export const generateAccessPolicy = async (tenantName: string, resource: string) => {
    const ai = getAiClient();
    if (!ai) return "AI Configuration Missing.";

    const prompt = `
      Generate a formal JSON access policy object for a new tenant "${tenantName}" accessing "${resource}".
      The policy should include:
      - schedule (standard business hours)
      - allowedMethods (face, app, pin)
      - expirationDate (1 year from now)
      
      Return ONLY raw JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Policy Error:", error);
        return "{}";
    }
}
