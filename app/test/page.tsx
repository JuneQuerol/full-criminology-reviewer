// app/test/page.tsx
import React from 'react';
import ModuleContent from '../../components/ModuleContent';

const TestPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <ModuleContent title="Test Title" contentHtml="<p>Test Content</p>" />
      </div>
    </div>
  );
};

export default TestPage;

