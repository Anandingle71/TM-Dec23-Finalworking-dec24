import { openai } from '../../openai/client';
import { ContentCache } from './cache';
import { chunkContent, optimizePrompt } from './utils';
import type { GenerationOptions } from './types';

const cache = new ContentCache();

export class ContentGenerationService {
  static async generate(prompt: string, options: GenerationOptions = {}) {
    const cacheKey = this.getCacheKey(prompt, options);
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    // Split content into smaller chunks for parallel generation
    const chunks = chunkContent(prompt);
    const optimizedPrompt = optimizePrompt(prompt);

    const responses = await Promise.all(
      chunks.map(chunk => 
        openai.chat.completions.create({
          model: options.model || "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert teacher creating educational content. Be concise and focused."
            },
            { role: "user", content: chunk }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: Math.min(options.maxTokens || 2000, 2000),
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      )
    );

    const content = responses
      .map(response => response.choices[0].message.content)
      .join('\n\n');

    cache.set(cacheKey, content);
    return content;
  }

  private static getCacheKey(prompt: string, options: GenerationOptions): string {
    return `${prompt}_${JSON.stringify(options)}`;
  }
}