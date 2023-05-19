import { ForwardedRef, forwardRef, type HTMLAttributes } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

export const DebounceInput = forwardRef(
  (
    {
      onChange,
      delay = 500,
      ...rest
    }: {
      onChange?: (value: string) => void;
      delay?: number;
    } & HTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = useState('');

    useEffect(() => {
      const timer = setTimeout(() => {
        if (onChange) {
          onChange(value);
        }
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, onChange, delay]);

    const handleChange = (e: Event) => {
      setValue((e.target as HTMLInputElement).value);
    };

    return <input ref={ref} onChange={handleChange} value={value} {...rest} />;
  }
);
