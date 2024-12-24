import type { SlideTemplate } from './types';

const SLIDE_LAYOUTS = {
  title: {
    name: 'Title Slide',
    imageCount: 1,
    style: 'hero'
  },
  concept: {
    name: 'Key Concept',
    imageCount: 2,
    style: 'split'
  },
  explanation: {
    name: 'Detailed Explanation',
    imageCount: 1,
    includeVideo: true,
    style: 'content-focus'
  },
  example: {
    name: 'Example',
    imageCount: 2,
    style: 'grid'
  },
  summary: {
    name: 'Summary',
    imageCount: 1,
    style: 'minimal'
  }
} as const;

export function generateSlideTemplates(data: {
  topic: string;
  slideCount: number;
  visualPreference: string;
}): SlideTemplate[] {
  // Core slides that every presentation should have
  const templates: SlideTemplate[] = [
    {
      title: 'Introduction',
      layout: SLIDE_LAYOUTS.title,
      content: '',
      imageCount: 1,
      style: 'hero'
    },
    {
      title: 'Learning Objectives',
      layout: SLIDE_LAYOUTS.concept,
      content: '',
      imageCount: 1,
      style: 'minimal'
    }
  ];

  // Add content slides based on count
  const contentSlideCount = data.slideCount - 3; // Subtract intro, objectives, and summary
  for (let i = 0; i < contentSlideCount; i++) {
    const layout = i % 2 === 0 ? SLIDE_LAYOUTS.concept : SLIDE_LAYOUTS.explanation;
    templates.push({
      title: `Key Concept ${i + 1}`,
      layout,
      content: '',
      imageCount: data.visualPreference === 'Visual-Heavy' ? layout.imageCount + 1 : layout.imageCount,
      includeVideo: layout.includeVideo,
      style: layout.style
    });
  }

  // Add summary slide
  templates.push({
    title: 'Summary & Key Takeaways',
    layout: SLIDE_LAYOUTS.summary,
    content: '',
    imageCount: 1,
    style: 'minimal'
  });

  return templates;
}