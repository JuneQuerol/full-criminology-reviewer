import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/Practice-Exams');

export function getQuizList() {
  const fileNames = fs.readdirSync(contentDirectory);
  const allQuizzesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as { title: string; description: string }),
      };
    });
  return allQuizzesData;
}

export function getQuizContent(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);
  const questions = parseQuizMarkdown(content);

  return {
    slug,
    questions,
    title: data.title || slug,
    description: data.description || '',
  };
}

export const parseQuizMarkdown = (markdown: string) => {
  const questions: any[] = [];
  const questionBlocks = markdown.split('###').slice(1); // Split by question heading and remove first empty element

  questionBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    const questionText = lines[0].trim();
    const choices: string[] = [];
    let correctAnswer = -1;
    let explanation = '';

    // Start from the first choice line
    let i = 1;
    for (; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- [')) {
        const choiceText = line.substring(line.indexOf(']') + 1).trim();
        choices.push(choiceText);
        if (line.startsWith('- [x]')) {
          correctAnswer = choices.length - 1;
        }
      } else if (line.startsWith('>')) {
        // The rest of the block is the explanation
        explanation = lines.slice(i).map(l => l.replace('>', '').trim()).join('\n');
        break;
      }
    }

    if (questionText && choices.length > 0 && correctAnswer !== -1) {
      questions.push({
        id: index + 1,
        question: questionText,
        choices,
        correctAnswer,
        explanation,
      });
    }
  });

  return questions;
};