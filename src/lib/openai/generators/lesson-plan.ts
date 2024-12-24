import { ContentGenerationService } from '../../services/content-generation/service';
import type { LessonPlanFormData } from '../../../types/forms';

export async function generateLessonPlan(data: LessonPlanFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  const prompt = `Create a lesson plan for ${data.subject} Grade ${data.grade}, Topic: ${data.topic}
Duration: ${data.duration}
Learning Styles: ${data.learningStyles.join(', ')}
Objectives: ${data.objectives}

Structure:
1. Learning objectives
2. Required materials
3. Introduction/Hook (5-10% of time)
4. Main activities incorporating VAK styles
5. Assessment strategies
6. Closure/Reflection
7. Extensions/Homework

Additional: ${data.additionalInstructions}`;

  return ContentGenerationService.generate(prompt, {
    maxTokens: 2000,
    temperature: 0.7
  });
}