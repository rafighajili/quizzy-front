import useRole from '#/hooks/useRole';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useProtect(role, returnValue, to) {
  const router = useRouter();
  const currentRole = useRole();

  useEffect(() => {
    currentRole !== role && router.push(to);
  }, []);

  return returnValue;
}
