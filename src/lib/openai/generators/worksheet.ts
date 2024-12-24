import { ContentGenerationService } from '../../services/content-generation/service';
import type { WorksheetFormData } from '../../../types/forms';

export async function generateWorksheet(data: WorksheetFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  const prompt = `Create a worksheet for ${data.subject} Grade ${data.grade}, Topic: ${data.topic}
Question Types: ${data.questionTypes.join(', ')}
Difficulty: ${data.difficultyLevel}
${data.includeAnswerKey ? 'Include answer key' : ''}

Format:
1. Clear instructions for each section
2. Space for student work
3. Mix of recall and higher-order thinking questions
${data.includeAnswerKey ? '4. Complete answer key' : ''}

Additional: ${data.additionalInstructions}`;

  return ContentGenerationService.generate(prompt, {
    maxTokens: 2000,
    temperature: 0.7
  });
}