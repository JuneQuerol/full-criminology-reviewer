import { getQuizContent, getQuizList } from '../../../lib/quiz-parser';
import QuizClient from './QuizClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const quizzes = getQuizList();
  return quizzes.map((quiz) => ({
    set: quiz.slug,
  }));
}

export default async function QuizPage({
  params,
}: {
  params: { set: string };
}) {
  const quiz = await getQuizContent(params.set);

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} />;
}