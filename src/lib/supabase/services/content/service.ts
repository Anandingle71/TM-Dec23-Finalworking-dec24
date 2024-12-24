import { supabase } from '../../client';
import { buildContentQuery } from './queries';
import type { Content, ContentInsert, ContentFilter } from './types';

export class ContentService {
  static async saveContent(data: Omit<ContentInsert, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Validate required fields
    if (!data.content?.trim()) {
      throw new Error('Content cannot be empty');
    }
    if (!data.chapter?.trim()) {
      throw new Error('Chapter cannot be empty');
    }

    try {
      const { data: result, error } = await supabase
        .from('content')
        .insert({
          user_id: user.id,
          ...data,
          metadata: data.metadata || {},
          content: data.content.trim(),
          chapter: data.chapter.trim()
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error saving content:', error);
        throw new Error(`Failed to save content: ${error.message}`);
      }

      return result;
    } catch (error) {
      console.error('Error in saveContent:', error);
      throw error;
    }
  }

  static async getRecentContent(filter?: ContentFilter): Promise<Content[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const query = buildContentQuery(filter)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching content:', error);
        throw new Error(`Failed to fetch content: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRecentContent:', error);
      throw error;
    }
  }
}