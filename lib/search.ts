import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SearchResult {
  type: 'module' | 'practice';
  title: string;
  url: string;
  excerpt: string;
}

const contentDir = path.join(process.cwd(), 'content');

export function searchContent(query: string): SearchResult[] {
  if (!query) {
    return [];
  }

  const allResults: SearchResult[] = [];

  const moduleFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

  for (const moduleFile of moduleFiles) {
    const filePath = path.join(contentDir, moduleFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const title = data.title || moduleFile.replace(/\.md$/, '');

    if (title.toLowerCase().includes(query.toLowerCase()) || content.toLowerCase().includes(query.toLowerCase())) {
      const excerpt = content.substring(0, 100) + '...';
      const url = `/part-1/${moduleFile.replace(/\.md$/, '')}`;
      allResults.push({
        type: 'module',
        title,
        url,
        excerpt,
      });
    }
  }

  const practiceExamsDir = path.join(contentDir, 'Practice-Exams');
  const practiceExamFiles = fs.readdirSync(practiceExamsDir).filter(file => file.endsWith('.md'));

  for (const practiceExamFile of practiceExamFiles) {
    const filePath = path.join(practiceExamsDir, practiceExamFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const title = data.title || practiceExamFile.replace(/\.md$/, '');

    if (title.toLowerCase().includes(query.toLowerCase()) || content.toLowerCase().includes(query.toLowerCase())) {
      const excerpt = content.substring(0, 100) + '...';
      const url = `/practice/${practiceExamFile.replace(/\.md$/, '')}`;
      allResults.push({
        type: 'practice',
        title,
        url,
        excerpt,
      });
    }
  }

  return allResults;
}
