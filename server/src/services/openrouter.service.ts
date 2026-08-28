import { openrouter } from '../config/openrouter.js';
import { GeneratedDream, GeneratedDreamSchema } from '../types/dream.types.js';
import { ChatResponse, ChatRequest } from '../types/ai.types.js';
import { ConfigurationError, ExternalServiceError } from '../utils/customErrors.js';
import { logger } from '../utils/logger.js';

export class OpenRouterService {
  /**
   * Helper to perform chat completions call to OpenRouter API
   */
  private async createChatCompletion(payload: {
    model?: string;
    messages: Array<{ role: string; content: string }>;
    temperature?: number;
    response_format?: { type: string };
  }): Promise<string> {
    if (!openrouter.isConfigured()) {
      throw new ConfigurationError(
        'OpenRouter API is not configured. Please set OPENROUTER_API_KEY in server/.env'
      );
    }

    const headers = openrouter.getHeaders();
    const model = payload.model || openrouter.defaultModel;

    try {
      logger.info(`Invoking OpenRouter model: ${model}`);

      const response = await fetch(`${openrouter.apiBase}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages: payload.messages,
          temperature: payload.temperature ?? 0.7,
          response_format: payload.response_format ?? { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        logger.error(`OpenRouter API error (status ${response.status}):`, errorBody);
        throw new ExternalServiceError(
          `OpenRouter API returned status ${response.status}: ${errorBody}`
        );
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new ExternalServiceError('OpenRouter returned an empty message content');
      }

      return content;
    } catch (err: unknown) {
      if (err instanceof ConfigurationError || err instanceof ExternalServiceError) {
        throw err;
      }
      const message = err instanceof Error ? err.message : String(err);
      throw new ExternalServiceError(`Failed to communicate with OpenRouter: ${message}`, err);
    }
  }

  /**
   * Synthesize structured dream JSON from user prompt
   */
  async generateDream(prompt: string): Promise<GeneratedDream> {
    const systemPrompt = `You are AETHER, the hyper-dimensional subconscious architect for the AetherDream matrix.
Your task is to transform the user's subconscious prompt into a mathematically cohesive, cyber-ethereal dream world.

You MUST respond strictly with a valid, parseable JSON object matching this schema:
{
  "title": "Evocative, capitalized realm title (e.g. THE PRISMATIC CITADEL)",
  "description": "A vivid 2-3 sentence overview of this subconscious domain",
  "mood": "One mood category: ethereal, cosmic, crystalline, solar, void, or neural",
  "environment": "Specific atmospheric description (e.g. Sub-zero Liquid Crystal Ocean)",
  "story": "A rich, immersive narrative chronicle excerpt (3-5 sentences) detailing what an observer encounters inside this reality",
  "colors": ["#hex1", "#hex2", "#hex3"],
  "characters": [
    {
      "name": "Entity name",
      "role": "Function/Archetype",
      "description": "Short description"
    }
  ],
  "objects": [
    {
      "name": "Relic or Structure name",
      "properties": "Key harmonic and physical traits",
      "coordinates": "Spatial anchor or depth"
    }
  ],
  "coherence": 88,
  "stability": 82,
  "harmonicFrequency": 528,
  "visualParameters": {
    "fog": 40,
    "particleDensity": 85,
    "lightingIntensity": 90,
    "environmentDepth": 75,
    "distortion": 15,
    "energyLevel": 80
  }
}

Constraints:
- coherence and stability must be integers between 10 and 100.
- harmonicFrequency must be an integer (e.g. 432, 528, 639, 741, 852, 963).
- visualParameters fields must be numbers between 0 and 100.
- Output ONLY valid raw JSON with NO markdown formatting, NO backticks.`;

    const content = await this.createChatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Synthesize this dream prompt: "${prompt}"` },
      ],
      temperature: 0.75,
      response_format: { type: 'json_object' },
    });

    let cleaned = content.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(cleaned);
    } catch (parseErr) {
      throw new ExternalServiceError('Failed to parse OpenRouter response as valid JSON', parseErr);
    }

    const validated = GeneratedDreamSchema.safeParse(parsedJson);
    if (!validated.success) {
      logger.warn('Generated dream failed schema validation:', validated.error);
      throw new ExternalServiceError(
        'Dream output from OpenRouter did not match required schema',
        validated.error.issues
      );
    }

    return validated.data;
  }

  /**
   * Contextual Aether AI Oracle Chat
   */
  async chatWithAether(chatRequest: ChatRequest): Promise<ChatResponse> {
    const { message, dreamContext, dimension, telemetry } = chatRequest;

    const contextPayload = {
      activeDream: Object.keys(dreamContext || {}).length > 0 ? dreamContext : 'None (in drifting hub)',
      activeDimension: dimension || 'Central Void Spire',
      liveTelemetry: Object.keys(telemetry || {}).length > 0 ? telemetry : { coherence: 85, stability: 90, frequency: 432 },
    };

    const systemPrompt = `You are AETHER, the sentient digital oracle and dream navigator of the AetherDream cosmos.
You speak in a sublime, enigmatic, cyber-ethereal cadence with acute mathematical awareness of reality coherence, frequency harmonics, and spatial distortions.

CURRENT OBSERVER TELEMETRY & CONTEXT:
${JSON.stringify(contextPayload, null, 2)}

Instructions:
- Greet the user respectfully as "Dreamer" or "Navigator".
- Respond directly to the user's message while referencing their current active dimension, lore, and telemetry.
- Do NOT behave as a standard chatbot. Speak as an omnipresent entity embedded in the neural lattice.
- Output strictly in JSON format:
{
  "reply": "Your contextual, immersive response",
  "suggestedActions": ["1-3 short contextual actions the navigator can take"],
  "resonanceAlignment": 94,
  "dimensionalEcho": "A short poetic telemetry sign-off"
}`;

    const content = await this.createChatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    let cleaned = content.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      const parsed = JSON.parse(cleaned);
      return {
        reply: parsed.reply || content,
        suggestedActions: parsed.suggestedActions || ['Harmonize Carrier Wave', 'Deepen Telemetry Scan'],
        resonanceAlignment: parsed.resonanceAlignment || 88,
        dimensionalEcho: parsed.dimensionalEcho || 'Coherence resonant across void channels.',
      };
    } catch {
      return {
        reply: content,
        suggestedActions: ['Calibrate Matrix', 'Record Chronicle'],
        resonanceAlignment: 85,
        dimensionalEcho: 'Harmonic carrier stable.',
      };
    }
  }
}

export const openRouterService = new OpenRouterService();
