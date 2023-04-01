'use client';

import useSWR from 'swr';
import { getTakes, takeKey } from '#/api/take';
import Card from '#/components/card';
import Input from '#/components/input';
import { useForm } from 'react-hook-form';
import Button from '#/components/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const { data: takes, isLoading } = useSWR(takeKey, getTakes);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onEnterTest = ({ testId }) => router.push(`/test/${testId}`);

  return (
    <>
      <Card>
        <form className="grid sm:grid-cols-[1fr,auto] gap-y-2 gap-x-4 sm:items-end" onSubmit={handleSubmit(onEnterTest)}>
          <Input name="testId" {...{ register }} label="Test ID" required errorMsg={errors.testId?.message} />
          <Button>Enter test</Button>
        </form>
      </Card>

      {isLoading ? (
        <Card className="w-full flex flex-col gap-y-8 mt-8">
          {Array(10)
            .fill(0)
            .map((_, key) => (
              <Card key={key} loading className="h-8" />
            ))}
        </Card>
      ) : (
        <Card className="mt-8">
          <div className="overflow-x-auto">
            <table className="table-fixed [&>*]:whitespace-nowrap">
              <thead className="border-b border-black/10">
                <tr className="[&>*]:py-2 [&>*]:px-8 [&>*]:text-start">
                  <th>Your previous takes</th>
                  <th>Score</th>
                  <th>Success rate</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr className="[&>*]:py-2 [&>*]:px-8 even:bg-black/5">
                  <td>Lorem ipsum dolor sit amet.</td>
                  <td>31</td>
                  <td>69</td>
                  <td>
                    <Button>See answers</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
