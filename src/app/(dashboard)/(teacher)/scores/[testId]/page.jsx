'use client';

import { getTakes, takesKey } from '#/api/test';
import Card from '#/components/card';
import useSWR from 'swr';

export default function Page({ params: { testId } }) {
  const { data, isLoading } = useSWR(takesKey, () => getTakes(testId, { anonymous: false }));

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
      <div className="overflow-x-auto">
        <table className="table-fixed [&>*]:whitespace-nowrap w-full">
          <thead className="border-b border-black/10">
            <tr className="[&>*]:py-2 [&>*]:px-8 [&>*]:text-start">
              <th>Student</th>
              <th>Score</th>
              <th>Success rate</th>
            </tr>
          </thead>

          <tbody>
            {data.map(({ fullName, score, successRate }) => (
              <tr key={fullName} className="[&>*]:py-2 [&>*]:px-8 even:bg-black/5">
                <td>{fullName}</td>
                <td>{score}</td>
                <td>{`${successRate?.toFixed(2)}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
