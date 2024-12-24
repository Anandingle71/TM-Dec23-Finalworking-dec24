import { ContentGenerationService } from '../content-generation/service';
import { generateSlideTemplates } from './templates';
import type { PresentationContent, SlideTemplate } from './types';

export async function generatePresentation(data: {
  topic: string;
  subject: string;
  grade: string;
  slideCount: number;
  visualPreference: string;
}): Promise<PresentationContent> {
  try {
    // Generate slide templates based on topic and preferences
    const templates = generateSlideTemplates(data);
    
    // Generate content for each slide template in parallel
    const slides = await Promise.all(
      templates.map(async (template: SlideTemplate, index: number) => {
        const prompt = `Create content for slide ${index + 1} about ${data.topic} in ${data.subject} for Grade ${data.grade}.
Title: ${template.title}
Style: ${data.visualPreference}
Layout: ${template.layout.name}

Include:
- Clear and concise points
- Relevant examples
- Key concepts
- Student engagement elements

Make the content suitable for a presentation slide (not too verbose).`;

        const content = await ContentGenerationService.generate(prompt, {
          maxTokens: 300,
          temperature: 0.7
        });

        return {
          id: crypto.randomUUID(),
          title: template.title,
          content,
          style: template.style,
          videoPlaceholder: template.includeVideo ? {
            topic: data.topic,
            requirements: `Educational video about ${template.title} in ${data.topic}`
          } : undefined,
          imagePlaceholders: template.imageCount ? {
            count: template.imageCount,
            topic: data.topic,
            requirements: `Educational images illustrating ${template.title}`
          } : undefined
        };
      })
    );

    return {
      slides,
      metadata: {
        subject: data.subject,
        grade: data.grade,
        topic: data.topic,
        totalSlides: slides.length,
        visualStyle: data.visualPreference
      }
    };
  } catch (error) {
    console.error('Error generating presentation:', error);
    throw new Error('Failed to generate presentation content. Please try again.');
  }
}