import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

function Select({ type, name, register, label, required, className, errorMsg, options, ...rest }, ref) {
  if (!name) {
    throw new Error("<Select /> must have 'name' prop.");
  }

  if (!register) {
    throw new Error("<Select /> must have 'register' prop.");
  }

  return (
    <label className={twMerge('flex flex-col text-start', className)}>
      <p className={clsx('font-medium text-sm', required && 'after:content-["*"] after:text-red-500 after:ml-1')}>
        {label}
      </p>

      <div className="relative">
        <select
          {...{ ref }}
          {...{ type }}
          {...register(name, { required: required ? 'Required!' : false, valueAsNumber: true })}
          className={clsx(
            'py-2 px-3 rounded-lg text-sm border duration-300 bg-transparent w-full',
            errorMsg ? 'border-red-500' : 'border-neutral-300 hover:border-neutral-500 focus:border-orange-500'
          )}
        >
          <option value="">-- select an option --</option>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5" />
      </div>

      {errorMsg && <p className="font-medium text-xs text-red-500">{errorMsg}</p>}
    </label>
  );
}

export default forwardRef(Select);
