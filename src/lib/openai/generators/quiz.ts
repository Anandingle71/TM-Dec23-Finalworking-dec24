import { ContentGenerationService } from '../../services/content-generation/service';
import type { QuizFormData } from '../../../types/forms';

export async function generateQuiz(data: QuizFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  const prompt = `Create a ${data.questionCount}-question quiz for ${data.subject} Grade ${data.grade}, Topic: ${data.topic}
Difficulty: ${data.difficultyLevel}
Using: ${data.taxonomyType}
Levels: ${data.taxonomyLevels.join(', ')}

Format each question:
1. Question
2. Four options (A-D)
3. Correct answer
4. Brief explanation

Additional: ${data.additionalInstructions}`;

  return ContentGenerationService.generate(prompt, {
    maxTokens: data.questionCount * 200, // Estimate tokens needed based on question count
    temperature: 0.7
  });
}