import { openRouterService } from './openrouter.service.js';
import { ChatResponse, ChatRequest } from '../types/ai.types.js';

export class AiService {
  /**
   * Conduct interactive contextualized session with Aether AI via OpenRouter
   */
  async chatWithAether(chatRequest: ChatRequest): Promise<ChatResponse> {
    return await openRouterService.chatWithAether(chatRequest);
  }
}

export const aiService = new AiService();
