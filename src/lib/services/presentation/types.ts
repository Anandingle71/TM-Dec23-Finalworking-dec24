export type SlideStyle = 'hero' | 'split' | 'content-focus' | 'grid' | 'minimal';

export interface SlideLayout {
  name: string;
  imageCount: number;
  includeVideo?: boolean;
  style: SlideStyle;
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  style: SlideStyle;
  videoPlaceholder?: {
    topic: string;
    requirements: string;
  };
  imagePlaceholders?: {
    count: number;
    topic: string;
    requirements: string;
  };
}

export interface PresentationContent {
  slides: Slide[];
  metadata: {
    subject: string;
    grade: string;
    topic: string;
    totalSlides: number;
    visualStyle: string;
  };
}

export interface SlideTemplate {
  title: string;
  layout: SlideLayout;
  content: string;
  imageCount: number;
  includeVideo?: boolean;
  style: SlideStyle;
}