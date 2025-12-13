// components/ModuleContent.tsx
import React from 'react';
import GoogleAd from './GoogleAd';

interface ModuleContentProps {
  title: string;
  contentHtml: string;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ title, contentHtml }) => {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-brand-navy dark:prose-headings:text-brand-gold max-w-none" data-id="module-content">
      {/* Title is already in the markdown content, no need to duplicate */}

      {/* Top of article ad - horizontal banner */}
      <div className="my-6 not-prose">
        <GoogleAd slot="2203895386" format="auto" />
      </div>

      {/* Main content - rendered as single block to preserve structure */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* Bottom of article ad */}
      <div className="my-8 not-prose">
        <GoogleAd slot="2203895386" format="auto" />
      </div>
    </article>
  );
};

export default ModuleContent;
