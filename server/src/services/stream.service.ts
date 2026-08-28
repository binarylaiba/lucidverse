import { streamRepository } from '../repositories/stream.repository.js';
import { StreamTransmissionEntity, CreateTransmissionRequest } from '../types/stream.types.js';

export class StreamService {
  /**
   * Fetch recent collective transmissions
   */
  async getRecentTransmissions(limit = 30): Promise<StreamTransmissionEntity[]> {
    return await streamRepository.findRecent(limit);
  }

  /**
   * Record a new traveler transmission
   */
  async recordTransmission(req: CreateTransmissionRequest): Promise<StreamTransmissionEntity> {
    return await streamRepository.create(req);
  }
}

export const streamService = new StreamService();
