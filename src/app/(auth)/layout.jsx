'use client';

import useProtect from '#/hooks/useProtect';
import useRole from '#/hooks/useRole';
import styles from './layout.module.css';

export default function Layout({ children }) {
  const currentRole = useRole();

  return useProtect(
    undefined,
    <main className={styles.base}>
      <div className={styles['base-container']}>
        <div className={styles.card}>{children}</div>
      </div>
    </main>,
    `/dashboard-${currentRole?.toLowerCase()}`
  );
}
