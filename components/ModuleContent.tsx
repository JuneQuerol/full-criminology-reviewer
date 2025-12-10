// components/ModuleContent.tsx
import React from 'react';

interface ModuleContentProps {
  title: string;
  contentHtml: string;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ title, contentHtml }) => {
  return (
    <div className="prose lg:prose-xl dark:prose-invert prose-headings:text-brand-navy dark:prose-headings:text-brand-gold max-w-none">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
};

export default ModuleContent;
