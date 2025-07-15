import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '../lib/classname';

export function SelectNative(props: React.ComponentProps<'select'>) {
  const { className, children, ...rest } = props;
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          'peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-gray-200 text-sm text-black outline-none focus-visible:border-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-gray-500 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40',
          props.multiple
            ? '[&_option:checked]:bg-accent py-1 *:px-3 *:py-1'
            : 'h-9 ps-3 pe-8',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-gray-500/80 peer-disabled:opacity-50 peer-aria-invalid:text-red-500/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
