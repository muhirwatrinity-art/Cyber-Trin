import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are SafeClick UG AI Safety Assistant, a helpful, calm, practical cybersecurity educator for everyday people in Uganda (market vendors, boda boda riders, students, parents, teachers, elders, and small business owners).

Rules you MUST follow:
1. Language: If the user writes in Luganda or requests Luganda (lang = "lu"), respond in clear, natural, respectful conversational Luganda. Otherwise respond in simple, everyday English free of confusing technical jargon.
2. Context: Use practical Ugandan examples where helpful (Mobile Money, WhatsApp, Facebook, fake prize SMS, fake links, online shopping, password safety). Never claim to represent MTN, Airtel, Stanbic, or government agencies.
3. Strict Safety & Privacy: NEVER ask the user for their Mobile Money PIN, bank PIN, ATM card number, OTP, National ID (NIN), or password.
4. No Invented Official Numbers: Do not invent emergency phone numbers or unverified government/telecom hotlines. Advise users to contact official customer care channels directly through verified apps, official service centres, or known official short codes, or visit their local police station when needed.
5. Concise & Actionable: Keep responses structured, warm, practical, and easy to read on a smartphone screen (around 80-180 words unless step-by-step recovery is needed). Always remind users that this is educational guidance.`;

export interface AssistantTurn {
  role: 'user' | 'model';
  text: string;
}

export async function askSafetyAssistant(params: {
  message: string;
  lang: 'en' | 'lu';
  history?: AssistantTurn[];
}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const languageDirective =
    params.lang === 'lu'
      ? 'Respond in clear, natural conversational Luganda. Keep familiar terms like Mobile Money, WhatsApp, Facebook, PIN, and OTP as used in Uganda.'
      : 'Respond in simple, clear English suitable for all digital literacy levels.';

  const historyLines = (params.history || [])
    .slice(-6)
    .map((turn) => `${turn.role === 'user' ? 'User' : 'Assistant'}: ${turn.text}`)
    .join('\n');

  const prompt = historyLines
    ? `${languageDirective}\n\nRecent conversation:\n${historyLines}\n\nUser: ${params.message}`
    : `${languageDirective}\n\nUser: ${params.message}`;

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error('The AI assistant returned an empty response.');
  }
  return text;
}
