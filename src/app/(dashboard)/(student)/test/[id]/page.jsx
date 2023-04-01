'use client';

import { getTest, testByIdKey } from '#/api/test';
import Card from '#/components/card';
import useSWR from 'swr';
import Question from './_components/question';
import { useEffect, useState } from 'react';
let renderCount = 0;

export default function Page({ params: { id } }) {
  renderCount++;
  const { data: test, isLoading } = useSWR(testByIdKey(id), () => getTest(id));

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (test) {
      setAnswers(test.questions.map((question) => ({ questionId: question.id })));
    }
  }, [test]);

  console.log(answers);

  return (
    <>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex flex-col [&>p]:text-xl [&>p]:font-bold">
          <p>Starts: 01.01.23, 12:00</p>
          <p>Ends: 01.01.23, 17:00</p>
        </div>

        <p>{renderCount}</p>

        <p className="text-lg font-medium">Remaining time: 02:54</p>
      </div>

      {isLoading ? (
        <Card className="w-full flex flex-col gap-y-8 mt-8">
          {Array(10)
            .fill(0)
            .map((_, key) => (
              <Card key={key} loading className="h-32" />
            ))}
        </Card>
      ) : test?.questions?.length ? (
        <Card className="mt-8">
          <ul className="divide-y divide-black/10">
            {test.questions.map((question, index) => (
              <Question key={question.id} {...{ question, setAnswers, index }} />
            ))}
          </ul>
        </Card>
      ) : (
        <p className="mt-8">No question found</p>
      )}
    </>
  );
}
