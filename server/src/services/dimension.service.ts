import { dimensionRepository } from '../repositories/dimension.repository.js';
import { DimensionEntity } from '../types/dimension.types.js';
import { NotFoundError } from '../utils/customErrors.js';

export class DimensionService {
  /**
   * Fetch all registered dimensions
   */
  async getDimensions(): Promise<DimensionEntity[]> {
    return await dimensionRepository.findAll();
  }

  /**
   * Fetch dimension by ID
   */
  async getDimensionById(id: string): Promise<DimensionEntity> {
    const dimension = await dimensionRepository.findById(id);
    if (!dimension) {
      throw new NotFoundError(`Dimension with ID "${id}" does not exist in the spatial codex.`);
    }
    return dimension;
  }
}

export const dimensionService = new DimensionService();
