import { supabase } from '../config/supabase.js';
import { DimensionEntity } from '../types/dimension.types.js';
import { ExternalServiceError, ConfigurationError } from '../utils/customErrors.js';

export class DimensionRepository {
  /**
   * Fetch all registered dimensions
   */
  async findAll(): Promise<DimensionEntity[]> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dimensions')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new ExternalServiceError(`Failed to fetch dimensions from Supabase: ${error.message}`, error);
    }

    return (data || []) as DimensionEntity[];
  }

  /**
   * Fetch dimension by ID
   */
  async findById(id: string): Promise<DimensionEntity | null> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dimensions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new ExternalServiceError(`Failed to fetch dimension ${id} from Supabase: ${error.message}`, error);
    }

    return data as DimensionEntity | null;
  }

  /**
   * Create or seed a dimension
   */
  async create(dim: Partial<DimensionEntity>): Promise<DimensionEntity> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dimensions')
      .insert(dim)
      .select()
      .single();

    if (error) {
      throw new ExternalServiceError(`Failed to create dimension: ${error.message}`, error);
    }

    return data as DimensionEntity;
  }
}

export const dimensionRepository = new DimensionRepository();
