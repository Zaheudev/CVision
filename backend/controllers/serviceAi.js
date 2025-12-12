// 1. Importuri
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// 2. Inițializare cu cheia ta
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 3. Funcția care generează textul pentru CV
async function enhanceCVDescription(userText) {
  try {
    // Folosim modelul 'gemini-1.5-flash' - e cel mai bun pentru free tier
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Instrucțiunea (Prompt-ul) - Aici e secretul
    const prompt = `
    You are an expert HR Resume Writer with 20 years of experience.
    I will provide you with a raw JSON object containing a user's rough career details.
    
    YOUR TASK:
    Transform this data into a high-end, corporate-ready CV structure.
    
    RULES:
    1. **Professional Summary**: Generate a strong 3-sentence summary based on the skills and experience provided.
    2. **Experience**: Rewrite all job descriptions into professional bullet points using strong action verbs (e.g., "Orchestrated", "Developed", "Maintained"). Turn "made burgers" into "Ensured high-quality food preparation standards in a fast-paced environment".
    3. **Skills**: Categorize skills into "Hard Skills" and "Soft Skills" and capitalize them correctly.
    4. **Language**: The output must be in the SAME LANGUAGE as the input (if input is Romanian, output Romanian).
    5. **Output Format**: You must output ONLY a valid JSON object. No Markdown, no explanations.
    6. If a field is missing in the input, omit it in the output or set it to N/A.
    7. Elaborate everyfield , example at language add level of proficiency, etc. at location if you got only
    a city add full location etc.
    
    REQUIRED JSON OUTPUT STRUCTURE:
    {
      "professionalSummary": "String",
      "experience": [
        {
          "company": "String",
          "role": "String",
          "period": "String",
          "enhancedDescription": ["Bullet 1", "Bullet 2", "Bullet 3"] 
        }
      ],
      "skills": {
        "hard": ["Skill 1", "Skill 2"],
        "soft": ["Skill 1", "Skill 2"]
      },
      "education": [
        {
          "institution": "String",
          "degree": "String",
          "period": "String"
        }
      ],
      "languages": ["Language 1", "Language 2"],
      "location": "String"
    }

    USER RAW DATA:
    ${JSON.stringify(userText)}
  `;

    // Generarea
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

// Curatare JSON (Gemini Pro uneori mai pune text pe langa)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    if (text.startsWith('Json') || text.startsWith('json')) {
        text = text.substring(4).trim();
    }

    return JSON.parse(text); // Returnăm textul curat

  } catch (error) {
    console.error("Eroare la Gemini:", error);
    return "Eroare: Nu am putut genera textul. Verifică consola.";
  }
}

// Exportăm funcția ca să o folosești în rute (controller)
module.exports = { enhanceCVDescription };