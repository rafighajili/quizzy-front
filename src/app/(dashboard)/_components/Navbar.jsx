'use client';

import Button from '#/components/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 w-screen bg-neutral-100">
      <div className="container h-24 flex items-center justify-between gap-x-4">
        <span className="text-3xl font-bold text-orange-500 select-none">Quizzy</span>
        <Button
          onClick={() => {
            localStorage.clear();
            router.push('/login');
          }}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
}
