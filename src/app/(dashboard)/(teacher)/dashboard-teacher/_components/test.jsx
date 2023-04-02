import Button from '#/components/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Test({ testId, testTitle, testIndex, index }) {
  const router = useRouter();

  const [copyText, setCopyText] = useState('');

  useEffect(() => {
    let timer;

    if (copyText) {
      timer = setTimeout(() => {
        setCopyText('');
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [copyText]);

  return (
    <li key={testId} className="py-4 px-8 first:mt-8 last:mb-8 font-medium flex items-center flex-wrap gap-4 odd:bg-black/5">
      <p>{`${index + 1}.${testIndex + 1}. ${testTitle}`}</p>
      <Button
        variant="text"
        onClick={() => {
          navigator.clipboard.writeText(testId);
          setCopyText('Copied');
        }}
      >
        Copy test ID
      </Button>
      {copyText && <p className="text-sm text-green-500"> {copyText}</p>}

      <span className="flex-1" />

      <Button variant="text" onClick={() => router.push(`/givemark/${testId}`)}>
        Grade
      </Button>
      <Button variant="text" onClick={() => router.push(`/scores/${testId}`)}>
        See scores
      </Button>
    </li>
  );
}
