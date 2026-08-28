import { openRouterService } from './openrouter.service.js';
import { dreamRepository } from '../repositories/dream.repository.js';
import { GeneratedDream, CreateDreamRequest, DreamEntity } from '../types/dream.types.js';
import { NotFoundError } from '../utils/customErrors.js';

export class DreamService {
  /**
   * Synthesize structured dream from user prompt via OpenRouter
   */
  async generateDream(prompt: string): Promise<GeneratedDream> {
    return await openRouterService.generateDream(prompt);
  }

  /**
   * Save dream to Supabase database
   */
  async saveDream(dreamData: CreateDreamRequest): Promise<DreamEntity> {
    return await dreamRepository.create(dreamData);
  }

  /**
   * Retrieve all recorded dreams
   */
  async getDreams(): Promise<DreamEntity[]> {
    return await dreamRepository.findAll();
  }

  /**
   * Retrieve a specific dream by ID
   */
  async getDreamById(id: string): Promise<DreamEntity> {
    const dream = await dreamRepository.findById(id);
    if (!dream) {
      throw new NotFoundError(`Dream with ID "${id}" was not found in the subconscious archive.`);
    }
    return dream;
  }

  /**
   * Delete a dream by ID
   */
  async deleteDream(id: string): Promise<void> {
    const deleted = await dreamRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Dream with ID "${id}" was not found or could not be removed.`);
    }
  }
}

export const dreamService = new DreamService();
