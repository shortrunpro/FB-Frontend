'use client';

import { ChangeEvent } from 'react';

import { ErrorMessage } from '@hookform/error-message';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  error?: Record<string, unknown>;
  'data-testid'?: string;
}

export function Textarea({
  label,
  icon,
  clearable,
  className,
  error,
  'data-testid': dataTestId,
  ...props
}: TextAreaProps) {
  let paddingY = '';
  if (icon) paddingY += 'pl-[38px] ';
  if (clearable) paddingY += 'pr-[38px]';

  const changeHandler = (value: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) props.onChange(value);
  };

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
          error && error?.name === props?.name && 'border-negative focus:border-negative',
          props.disabled && 'cursor-not-allowed bg-disabled',
          paddingY,
          className
        )}
        value={props.value}
        onChange={e => changeHandler(e)}
        data-testid={dataTestId ?? 'textarea'}
        {...props}
      />
      {error && props?.name && error?.name === props?.name && (
        <ErrorMessage
          errors={error}
          name={props?.name}
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
