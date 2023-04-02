'use client';

import Button from '#/components/button';
import Test from './test';

export default function Quiz({ quiz, setIsTestModalOpen, setCurrentQuizId, index }) {
  const { quizId, quizTitle, tests } = quiz;

  return (
    <li className="p-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <p className="text-lg font-medium">{`${index + 1}. ${quizTitle}`}</p>

        <div className="flex gap-4 flex-wrap">
          <Button href={`/quiz/${quizId}`} variant="text">
            Go to questions
          </Button>

          <Button
            variant="text"
            onClick={() => {
              setIsTestModalOpen(true);
              setCurrentQuizId(quizId);
            }}
          >
            Add test
          </Button>
        </div>
      </div>

      <ul>
        {tests.map(({ testId, testTitle }, testIndex) => (
          <Test key={testId} {...{ testId, testTitle, testIndex, index }} />
        ))}
      </ul>
    </li>
  );
}
