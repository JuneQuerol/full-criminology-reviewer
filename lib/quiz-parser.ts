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

// Map letter to index: a=0, b=1, c=2, d=3
const letterToIndex = (letter: string): number => {
  const normalized = letter.toLowerCase().trim();
  return normalized.charCodeAt(0) - 97; // 'a' is 97 in ASCII
};

export const parseQuizMarkdown = (markdown: string) => {
  const questions: any[] = [];
  const lines = markdown.split('\n');

  // First, extract answer keys from the end of the file (format: "1. a")
  const answerKeyMap: Record<number, number> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    const answerMatch = trimmed.match(/^(\d+)\.\s*([a-dA-D])$/);
    if (answerMatch) {
      const qNum = parseInt(answerMatch[1]);
      const answer = letterToIndex(answerMatch[2]);
      answerKeyMap[qNum] = answer;
    }
  }

  // Also look for inline answer format: "**14. c) Answer text**" with "*   **Explanation:**"
  const inlineAnswers: Record<number, { answer: number; explanation: string }> = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Match "**14. c) Text**" format
    const inlineMatch = line.match(/^\*\*(\d+)\.\s*([a-dA-D])\)\s*(.+?)\*\*$/);
    if (inlineMatch) {
      const qNum = parseInt(inlineMatch[1]);
      const answer = letterToIndex(inlineMatch[2]);
      // Look for explanation on next lines
      let explanation = '';
      for (let j = i + 1; j < lines.length && j < i + 5; j++) {
        const nextLine = lines[j].trim();
        if (nextLine.includes('**Explanation:**')) {
          explanation = nextLine.replace(/^\*+\s*\*\*Explanation:\*\*\s*/, '').trim();
          break;
        }
      }
      inlineAnswers[qNum] = { answer, explanation };
    }
  }

  // Now parse questions
  let currentQuestion: { number: number; text: string; choices: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Skip answer key lines (just "number. letter")
    if (/^\d+\.\s*[a-dA-D]$/.test(trimmed)) continue;

    // Skip inline answer lines (already processed above)
    if (/^\*\*\d+\.\s*[a-dA-D]\)\s*.+\*\*$/.test(trimmed)) continue;

    // Skip explanation lines
    if (trimmed.includes('**Explanation:**')) continue;

    // Skip headers and instructions
    if (trimmed.startsWith('#') || trimmed.startsWith('**Instructions')) continue;

    // Check for a new question
    // Match patterns like "**1. Question**" or "1. Question" or "1.  Question"
    const questionMatch = trimmed.match(/^\*{0,2}(\d+)\.\s*(.+?)(?:\*{2})?$/);
    if (questionMatch && !trimmed.match(/^\d+\.\s*[a-dA-D]$/) && !trimmed.match(/^\*\*\d+\.\s*[a-dA-D]\)/)) {
      // Check if this is actually a question (not just a number)
      const potentialQuestion = questionMatch[2].trim().replace(/\*{2}$/, '');

      // Skip if it's too short or looks like an answer reference
      if (potentialQuestion.length < 5) continue;

      // Save previous question if exists
      if (currentQuestion && currentQuestion.choices.length >= 2) {
        const answerFromKey = answerKeyMap[currentQuestion.number];
        const inlineData = inlineAnswers[currentQuestion.number];
        questions.push({
          id: currentQuestion.number,
          question: currentQuestion.text,
          choices: currentQuestion.choices,
          correctAnswer: inlineData?.answer ?? answerFromKey ?? 0,
          explanation: inlineData?.explanation ?? '',
        });
      }

      // Start new question
      const questionNumber = parseInt(questionMatch[1]);
      let questionText = potentialQuestion;

      currentQuestion = {
        number: questionNumber,
        text: questionText,
        choices: [],
      };
      continue;
    }

    // Check for choice options
    // Match patterns like "a) Option" or "    a) Option" or "a. Option"
    const choiceMatch = trimmed.match(/^([a-dA-D])[\)\.]?\s*(.+)$/);
    if (choiceMatch && currentQuestion) {
      currentQuestion.choices.push(choiceMatch[2].trim());
      continue;
    }

    // If we're in a question and this line doesn't match any pattern,
    // it might be a continuation of the question text
    if (currentQuestion && currentQuestion.choices.length === 0 && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*')) {
      if (!trimmed.match(/^[a-dA-D][\)\.]/) && !trimmed.match(/^\*{0,2}\d+\./)) {
        currentQuestion.text += ' ' + trimmed.replace(/\*{2}/g, '');
      }
    }
  }

  // Don't forget the last question
  if (currentQuestion && currentQuestion.choices.length >= 2) {
    const answerFromKey = answerKeyMap[currentQuestion.number];
    const inlineData = inlineAnswers[currentQuestion.number];
    questions.push({
      id: currentQuestion.number,
      question: currentQuestion.text,
      choices: currentQuestion.choices,
      correctAnswer: inlineData?.answer ?? answerFromKey ?? 0,
      explanation: inlineData?.explanation ?? '',
    });
  }

  return questions;
};
