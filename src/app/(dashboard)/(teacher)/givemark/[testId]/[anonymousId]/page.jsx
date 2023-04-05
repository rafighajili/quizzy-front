'use client';

import { getOpenended, openendedKey, postGivemark } from '#/api/take';
import Button from '#/components/button';
import Card from '#/components/card';
import Input from '#/components/input';
import { alertState } from '#/recoil/alert';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';

export default function Page({ params: { anonymousId, testId } }) {
  const router = useRouter();

  const setAlert = useSetRecoilState(alertState);

  const { data, isLoading } = useSWR(openendedKey, () => getOpenended(anonymousId));

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const { fields } = useFieldArray({ name: 'marks', control });

  useEffect(() => {
    reset({ marks: data?.map(({ takeQuestionId, score }) => ({ id: takeQuestionId, score: score.toString() })) });
  }, [data]);

  const onSubmit = async (data) => {
    try {
      await postGivemark(anonymousId, data);
      router.push('/givemark/' + testId);
    } catch (error) {
      setAlert({ type: false, message: error?.response?.data?.message ?? 'Something went wrong!' });
    }
  };

  return isLoading ? (
    <Card className="w-full flex flex-col gap-y-8">
      {Array(10)
        .fill(0)
        .map((_, key) => (
          <Card key={key} loading className="h-8" />
        ))}
    </Card>
  ) : (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="divide-y divide-black/10">
          {data.map(({ takeQuestionId, questionText, studentAnswer }, index) => (
            <li key={takeQuestionId} className="space-y-2 py-8">
              <p>
                <strong>Question text: </strong>
                {questionText}
              </p>

              <p>
                <strong>Student answer: </strong>
                {studentAnswer}
              </p>

              <Input
                label="Mark"
                className="w-32"
                options={{ min: { value: 0, message: 'Minimum 0!' }, max: { value: 10, message: 'Maximum 10!' } }}
                {...{ register }}
                name={`marks.${index}.score`}
                type="number"
                errorMsg={errors?.marks?.[index]?.score.message}
                required
              />
            </li>
          ))}
        </ul>

        <Button className="mt-8" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
