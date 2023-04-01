'use client';

import useProtect from '#/hooks/useProtect';

export default function Layout({ children }) {
  return useProtect('Teacher', children, '/login');
}
