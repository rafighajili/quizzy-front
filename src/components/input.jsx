import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { forwardRef } from 'react';

function Input({ type, name, register, label, required, className, errorMsg, options, ...rest }, ref) {
  if (!name) {
    throw new Error("<Input /> must have 'name' prop.");
  }

  if (!register) {
    throw new Error("<Input /> must have 'register' prop.");
  }

  return (
    <label className={twMerge('flex flex-col text-start', className)}>
      {label && <p className={clsx('font-medium text-sm', required && 'after:content-["*"] after:text-red-500 after:ml-1')}>{label}</p>}

      <input
        {...{ ref }}
        {...{ type }}
        {...register(name, {
          required: required ? 'Required!' : false,
          setValueAs: (v) => {
            if (type === 'number') {
              return v?.length ? +v : null;
            } else if (type === 'date' || (type === 'datetime-local' && v)) {
              return new Date(v).toISOString();
            } else {
              return v;
            }
          },
          ...options,
        })}
        className={clsx('py-2 px-3 rounded-lg text-sm border duration-300 bg-transparent', errorMsg ? 'border-red-500' : 'border-neutral-300 hover:border-neutral-500 focus:border-orange-500')}
        {...rest}
      />

      {errorMsg && <p className="font-medium text-xs text-red-500">{errorMsg}</p>}
    </label>
  );
}

export default forwardRef(Input);
