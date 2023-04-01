import Link from 'next/link';
import clsx from 'clsx';

export default function Button({ children, href, className, disabled, loading, variant = 'contained', ...rest }) {
  const As = href ? Link : 'button';

  return (
    <As
      {...{ href }}
      className={clsx(
        variant === 'contained' &&
          clsx(
            'grid place-items-center h-10 px-4 rounded-xl bg-gradient-to-b text-white whitespace-nowrap duration-300',
            'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 active:hover:from-orange-700 active:hover:to-orange-600',
            'disabled:!from-neutral-500 disabled:!to-neutral-600',
            'border-y-2 border-t-white/50 border-b-black/50 select-none'
          ),
        variant === 'text' && 'text-orange-500 font-medium hover:underline disabled:line-through disabled:text-neutral-500',
        'disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </As>
  );
}
