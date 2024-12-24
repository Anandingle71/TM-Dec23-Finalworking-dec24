import React from 'react';
import { Video, Image } from 'lucide-react';
import { cn } from '../../utils/styles';
import type { Slide as SlideType } from '../../lib/services/presentation/types';

interface SlideProps {
  slide: SlideType;
  index: number;
}

export function Slide({ slide, index }: SlideProps) {
  const slideStyles = {
    hero: 'grid grid-cols-2 gap-6',
    split: 'grid grid-cols-2 gap-4',
    'content-focus': 'space-y-4',
    grid: 'grid grid-cols-2 gap-4',
    minimal: 'max-w-2xl mx-auto space-y-4'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Slide {index + 1}: {slide.title}
        </h3>
        <span className="text-sm text-gray-500 capitalize">{slide.style} Layout</span>
      </div>

      <div className={cn('prose max-w-none', slideStyles[slide.style])}>
        <div className="space-y-4">
          {slide.content.split('\n').map((paragraph, i) => (
            <p key={i} className="text-gray-700">{paragraph}</p>
          ))}
        </div>

        {slide.imagePlaceholders && (
          <div className={cn(
            'grid gap-4',
            slide.style === 'grid' ? 'grid-cols-2' : 'grid-cols-1'
          )}>
            {Array.from({ length: slide.imagePlaceholders.count }).map((_, i) => (
              <div key={i} className="aspect-video bg-gray-50 rounded-md border border-gray-200 p-4 flex flex-col items-center justify-center">
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  {slide.imagePlaceholders.requirements}
                </p>
              </div>
            ))}
          </div>
        )}

        {slide.videoPlaceholder && (
          <div className="aspect-video bg-gray-50 rounded-md border border-gray-200 p-4 flex flex-col items-center justify-center">
            <Video className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              {slide.videoPlaceholder.requirements}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}