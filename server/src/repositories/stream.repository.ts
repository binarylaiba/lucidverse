import { supabase } from '../config/supabase.js';
import { StreamTransmissionEntity, CreateTransmissionRequest } from '../types/stream.types.js';
import { ExternalServiceError, ConfigurationError } from '../utils/customErrors.js';

export class StreamRepository {
  /**
   * Find recent dream stream transmissions
   */
  async findRecent(limit = 30): Promise<StreamTransmissionEntity[]> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('stream_transmissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new ExternalServiceError(`Failed to fetch stream transmissions: ${error.message}`, error);
    }

    return (data || []) as StreamTransmissionEntity[];
  }

  /**
   * Post a new stream transmission
   */
  async create(req: CreateTransmissionRequest): Promise<StreamTransmissionEntity> {
    if (!supabase.isConfigured()) {
      throw new ConfigurationError(
        'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env'
      );
    }

    const { data, error } = await supabase.client
      .from('stream_transmissions')
      .insert({
        traveler_name: req.travelerName,
        dimension_id: req.dimensionId || null,
        message: req.message,
        frequency: req.frequency || 432,
      })
      .select()
      .single();

    if (error) {
      throw new ExternalServiceError(`Failed to publish stream transmission: ${error.message}`, error);
    }

    return data as StreamTransmissionEntity;
  }
}

export const streamRepository = new StreamRepository();
