import { supabase } from '../config/supabase.js';
import { DreamEntity, CreateDreamRequest } from '../types/dream.types.js';
import { ExternalServiceError, ConfigurationError } from '../utils/customErrors.js';

export class DreamRepository {
  /**
   * Create and persist a new dream in Supabase
   */
  async create(dreamData: CreateDreamRequest): Promise<DreamEntity> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dreams')
      .insert({
        title: dreamData.title,
        prompt: dreamData.prompt,
        description: dreamData.description,
        mood: dreamData.mood,
        environment: dreamData.environment,
        story: dreamData.story,
        colors: dreamData.colors,
        characters: dreamData.characters,
        objects: dreamData.objects,
        coherence: dreamData.coherence,
        stability: dreamData.stability,
        harmonic_frequency: dreamData.harmonicFrequency,
        visual_parameters: dreamData.visualParameters,
      })
      .select()
      .single();

    if (error) {
      throw new ExternalServiceError(`Failed to save dream to Supabase: ${error.message}`, error);
    }

    return data as DreamEntity;
  }

  /**
   * Retrieve all dreams ordered by creation date descending
   */
  async findAll(): Promise<DreamEntity[]> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dreams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new ExternalServiceError(`Failed to fetch dreams from Supabase: ${error.message}`, error);
    }

    return (data || []) as DreamEntity[];
  }

  /**
   * Retrieve single dream by ID
   */
  async findById(id: string): Promise<DreamEntity | null> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('dreams')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new ExternalServiceError(`Failed to fetch dream ${id} from Supabase: ${error.message}`, error);
    }

    return data as DreamEntity | null;
  }

  /**
   * Delete dream by ID
   */
  async deleteById(id: string): Promise<boolean> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { error, count } = await supabase.client
      .from('dreams')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) {
      throw new ExternalServiceError(`Failed to delete dream ${id} from Supabase: ${error.message}`, error);
    }

    return (count || 0) > 0;
  }
}

export const dreamRepository = new DreamRepository();
