'use client';

import { useRecoilState } from 'recoil';
import { alertState } from '#/recoil/alert';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function Wrappers({ children }) {
  return <AlertWrapper>{children}</AlertWrapper>;
}

function AlertWrapper({ children }) {
  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {
    let timer;

    if (!!alert?.message) {
      timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, message: '' }));
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      {alert?.message && (
        <div className={clsx('p-4 rounded-xl fixed top-4 right-4 text-white border-2 shadow-lg font-medium z-[999]', alert?.type ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700')}>
          {alert?.message}
        </div>
      )}
      {children}
    </>
  );
}
