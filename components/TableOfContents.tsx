"use client";
// components/TableOfContents.tsx
import React, { useState, useEffect } from 'react';

interface Heading {
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings: Heading[] = [];
    lines.forEach(line => {
      if (line.startsWith('#')) {
        const level = line.match(/#/g)?.length || 0;
        const text = line.replace(/#/g, '').trim();
        if (level > 0) {
          extractedHeadings.push({ text, level });
        }
      }
    });
    setHeadings(extractedHeadings);
  }, [content]);

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}>
            <a href={`#${slugify(heading.text)}`} className="text-blue-600 hover:underline">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
