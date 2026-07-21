'use client';

import { ChangeEvent } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { get } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  error?: Record<string, unknown>;
  name: string;
  'data-testid'?: string;
}

export function Textarea({
  label,
  icon,
  clearable,
  className,
  error,
  name,
  'data-testid': dataTestId,
  ...props
}: TextAreaProps) {
  let paddingY = '';
  if (icon) paddingY += 'pl-[38px] ';
  if (clearable) paddingY += 'pr-[38px]';

  const changeHandler = (value: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) props.onChange(value);
  };
  const hasError = get(error, name);
  return (
    <div className="relative w-full">
      {label && <label className="label-md">{label}</label>}
      {icon && (
        <span
          className="absolute left-[16px] top-[16px]"
          data-testid={dataTestId ? `${dataTestId}-icon` : 'textarea-icon'}
        >
          {icon}
        </span>
      )}
      <textarea
        className={cn(
          'w-full rounded-sm border bg-component-secondary px-[16px] py-[12px] focus:border-primary focus:outline-none focus:ring-0',
          hasError && 'border-negative focus:border-negative',
          props.disabled && 'cursor-not-allowed bg-disabled',
          paddingY,
          className
        )}
        name={name}
        aria-invalid={hasError}
        value={props.value}
        onChange={e => changeHandler(e)}
        data-testid={dataTestId ?? 'textarea'}
        {...props}
      />
      {hasError && (
        <ErrorMessage
          errors={error}
          name={name}
          render={({ message }) => {
            return (
              <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                <span>{message}</span>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
