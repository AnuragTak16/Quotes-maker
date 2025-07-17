'use client';

import { templates } from '@/lib/templates'; // Assuming templates are in lib/templates

interface TemplatePreviewGridProps {
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
}

export function TemplatePreviewGrid({
  selectedTemplate,
  setSelectedTemplate,
}: TemplatePreviewGridProps) {
  return (
    <div className='mt-8'>
      <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>
        Template Styles
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'ring-2 ring-purple-500 scale-105'
                : 'hover:scale-105'
            }`}
            style={{
              background: `linear-gradient(135deg, ${template.colors.bg1}, ${template.colors.bg2})`,
              borderColor: template.colors.border,
            }}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className='text-center'>
              <div
                className='text-xs font-semibold mb-1'
                style={{ color: template.colors.text }}
              >
                Sample Quote
              </div>
              <div
                className='text-xs opacity-80'
                style={{ color: template.colors.author }}
              >
                {template.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
