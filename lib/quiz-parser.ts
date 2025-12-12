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
  const lines = markdown.split('\n');
  
  // New format check: Does the content use "###" for questions and "[x]" for answers?
  const isNewFormat = lines.some(line => line.trim().startsWith('###')) && lines.some(line => line.trim().startsWith('- [x]'));

  if (isNewFormat) {
    const questions: any[] = [];
    let currentQuestion: { text: string; choices: string[]; correctAnswer: number; explanation: string } | null = null;
    let questionCounter = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('###')) {
        // Save previous question
        if (currentQuestion) {
          questions.push({
            id: ++questionCounter,
            question: currentQuestion.text,
            ...currentQuestion
          });
        }
        // Start new question
        currentQuestion = {
          text: trimmed.replace('###', '').trim(),
          choices: [],
          correctAnswer: -1,
          explanation: '',
        };
      } else if (trimmed.startsWith('- [')) { // Choice
        if (currentQuestion) {
          const isCorrect = trimmed.startsWith('- [x]');
          if (isCorrect) {
            currentQuestion.correctAnswer = currentQuestion.choices.length;
          }
          currentQuestion.choices.push(trimmed.substring(5).trim());
        }
      } else if (trimmed.startsWith('> Explanation:')) { // Explanation
        if (currentQuestion) {
          currentQuestion.explanation = trimmed.replace('> Explanation:', '').trim();
        }
      }
    }
    // Save the last question
    if (currentQuestion) {
      questions.push({
        id: ++questionCounter,
        question: currentQuestion.text,
        ...currentQuestion
      });
    }
    return questions;
  }
  
  // Fallback to old parsing logic
  const questions: any[] = [];
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

  const inlineAnswers: Record<number, { answer: number; explanation: string }> = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const inlineMatch = line.match(/^\*\*(\d+)\.\s*([a-dA-D])\)\s*(.+?)\*\*$/);
    if (inlineMatch) {
      const qNum = parseInt(inlineMatch[1]);
      const answer = letterToIndex(inlineMatch[2]);
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

  let currentQuestion: { number: number; text: string; choices: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) continue;
    if (/^\d+\.\s*[a-dA-D]$/.test(trimmed)) continue;
    if (/^\*\*\d+\.\s*[a-dA-D]\)\s*.+\*\*$/.test(trimmed)) continue;
    if (trimmed.includes('**Explanation:**')) continue;
    if (trimmed.startsWith('#') || trimmed.startsWith('**Instructions')) continue;

    const questionMatch = trimmed.match(/^\*{0,2}(\d+)\.\s*(.+?)(?:\*{2})?$/);
    if (questionMatch && !trimmed.match(/^\d+\.\s*[a-dA-D]$/) && !trimmed.match(/^\*\*\d+\.\s*[a-dA-D]\)/)) {
      const potentialQuestion = questionMatch[2].trim().replace(/\*{2}$/, '');
      if (potentialQuestion.length < 5) continue;
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
      const questionNumber = parseInt(questionMatch[1]);
      let questionText = potentialQuestion;
      currentQuestion = {
        number: questionNumber,
        text: questionText,
        choices: [],
      };
      continue;
    }

    const choiceMatch = trimmed.match(/^([a-dA-D])[\)\.]?\s*(.+)$/);
    if (choiceMatch && currentQuestion) {
      currentQuestion.choices.push(choiceMatch[2].trim());
      continue;
    }

    if (currentQuestion && currentQuestion.choices.length === 0 && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*')) {
      if (!trimmed.match(/^[a-dA-D][\)\.]/) && !trimmed.match(/^\*{0,2}\d+\./)) {
        currentQuestion.text += ' ' + trimmed.replace(/\*{2}/g, '');
      }
    }
  }

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
