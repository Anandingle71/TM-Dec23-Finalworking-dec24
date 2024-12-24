import React, { useEffect, useState } from 'react';
import { useContentStore } from '../../store/contentStore';
import { ExportMenu } from '../ui/ExportMenu';
import { Alert } from '../ui/Alert';
import type { Database } from '../../lib/supabase/types';

type ContentType = Database['public']['Tables']['content']['Row']['type'];

interface ResultDisplayProps {
  content: string | null;
  type: ContentType;
  curriculumData?: {
    subject: string;
    grade: string;
    chapter: string;
  } | null;
}

export function ResultDisplay({ content, type, curriculumData }: ResultDisplayProps) {
  const { saveContent, error } = useContentStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    const saveGeneratedContent = async () => {
      if (content && curriculumData) {
        try {
          setSaveStatus('saving');
          await saveContent({
            type,
            content,
            subject: curriculumData.subject,
            grade: curriculumData.grade,
            chapter: curriculumData.chapter,
            metadata: {
              timestamp: new Date().toISOString(),
              version: '1.0'
            }
          });
          setSaveStatus('saved');
        } catch (err) {
          console.error('Error saving content:', err);
          setSaveStatus('error');
        }
      }
    };

    if (content && curriculumData) {
      saveGeneratedContent();
    }
  }, [content, curriculumData, type, saveContent]);

  if (!content) return null;

  return (
    <div className="mt-8">
      {saveStatus === 'saving' && (
        <Alert variant="info" className="mb-4">
          Saving content...
        </Alert>
      )}
      
      {saveStatus === 'saved' && (
        <Alert variant="success" className="mb-4">
          Content saved successfully!
        </Alert>
      )}
      
      {saveStatus === 'error' && (
        <Alert variant="error" className="mb-4">
          Failed to save content: {error}
        </Alert>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Generated Content</h3>
        <ExportMenu content={content} type={type} />
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}