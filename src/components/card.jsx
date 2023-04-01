import clsx from 'clsx';

export default function Card({ children, className, loading }) {
  return (
    <div
      className={clsx(
        'border border-black/10 rounded-3xl p-4 shadow',
        loading && 'bg-black/5 animate-pulse',
        className
      )}
    >
      {!loading && children}
    </div>
  );
}
