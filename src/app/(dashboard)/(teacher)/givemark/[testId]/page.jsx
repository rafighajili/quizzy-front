'use client';

import { getTakes, takesKey } from '#/api/test';
import Button from '#/components/button';
import Card from '#/components/card';
import { useRouter, usePathname } from 'next/navigation';
import useSWR from 'swr';

export default function Page({ params: { testId } }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useSWR(takesKey, () => getTakes(testId, { anonymous: true }));

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
              <th>Reviewed</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map(({ isReviewed, anonymousId }, index) => (
              <tr key={index} className="[&>*]:py-2 [&>*]:px-8 even:bg-black/5">
                <td>{`Student ${index + 1}`}</td>
                <td>{isReviewed ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="text" onClick={() => router.push(pathname + '/' + anonymousId)}>
                    View open-ended answers
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
