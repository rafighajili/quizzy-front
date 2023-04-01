'use client';

import { getQuestions, questionsKey } from '#/api/question';
import Button from '#/components/button';
import Card from '#/components/card';
import { useState } from 'react';
import useSWR from 'swr';
import Question from './_components/question';
import QuestionModal from './_components/question-modal';

export default function Page({ params: { quizId } }) {
  const { data: questions, isLoading } = useSWR(questionsKey(quizId), () => getQuestions(quizId));

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionModalOptions, setQuestionModalOptions] = useState({});

  return (
    <>
      <Button
        onClick={() => {
          setQuestionModalOptions({ mode: 'add' });
          setIsQuestionModalOpen(true);
        }}
      >
        Add a new question
      </Button>

      {isLoading ? (
        <Card className="w-full flex flex-col gap-y-8 mt-8">
          {Array(31)
            .fill(0)
            .map((_, key) => (
              <Card key={key} loading className="h-48" />
            ))}
        </Card>
      ) : questions?.length ? (
        <Card className="mt-8">
          <ul className="divide-y divide-black/10">
            {questions?.map((question, index) => (
              <Question key={question.id} {...{ question, quizId, setIsQuestionModalOpen, setQuestionModalOptions, index }} />
            ))}
          </ul>
        </Card>
      ) : (
        <p className="mt-8">No question found</p>
      )}

      <QuestionModal {...{ show: isQuestionModalOpen, onClose: () => setIsQuestionModalOpen(false), quizId, options: questionModalOptions }} />
    </>
  );
}
