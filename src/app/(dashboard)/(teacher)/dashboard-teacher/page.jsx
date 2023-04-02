'use client';

import { getQuizzes, quizKey } from '#/api/quiz';
import Button from '#/components/button';
import Card from '#/components/card';
import { useState } from 'react';
import useSWR from 'swr';
import Quiz from './_components/quiz';
import QuizModal from './_components/quiz-modal';
import TestModal from './_components/test-modal';

export default function Page() {
  const { data: quizzes, isLoading } = useSWR(quizKey, getQuizzes);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState('');

  return (
    <>
      <Button onClick={() => setIsQuizModalOpen(true)}>Add a new quiz</Button>

      {isLoading ? (
        <Card className="w-full flex flex-col gap-y-8 mt-8">
          {Array(10)
            .fill(0)
            .map((_, key) => (
              <Card key={key} loading className="h-32" />
            ))}
        </Card>
      ) : quizzes.length ? (
        <Card className="mt-8">
          <ul className="divide-y divide-black/10">
            {quizzes.map((quiz, index) => (
              <Quiz key={quiz.quizId} {...{ quiz, setIsTestModalOpen, setCurrentQuizId, index }} />
            ))}
          </ul>
        </Card>
      ) : (
        <p className="mt-8">No question found</p>
      )}

      <QuizModal show={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} />
      <TestModal show={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} quizId={currentQuizId} />
    </>
  );
}
