'use client';

import { useEffect, useState } from 'react';

import { ErrorMessage as Error } from '@hookform/error-message';
import { EyeMini, EyeSlashMini } from '@medusajs/icons';
import { get } from 'react-hook-form';

import { CloseIcon } from '@/icons';
import { cn } from '@/lib/utils';

import ErrorMessage from '../ErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  changeValue?: (value: string) => void;
  onIconClick?: () => void;
  iconAriaLabel?: string;
  'data-testid'?: string;
}

export function Input({
  name,
  label,
  icon,
  clearable,
  className,
  errors,
  touched,
  changeValue,
  onIconClick,
  iconAriaLabel,
  'data-testid': dataTestId,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(props.type);
  let paddingY = '';
  if (icon) paddingY += 'pl-[46px] ';
  if (clearable) paddingY += 'pr-[38px]';

  useEffect(() => {
    if (props.type === 'password' && showPassword) {
      setInputType('text');
    }

    if (props.type === 'password' && !showPassword) {
      setInputType('password');
    }
  }, [props.type, showPassword]);

  const changeHandler = (value: string) => {
    if (changeValue) changeValue(value);
  };

  const clearHandler = () => {
    if (changeValue) changeValue('');
  };
  const hasError = get(errors, name);
  return (
    <div className="flex flex-col">
      <label className="label-md">{label}</label>
      <div className="relative">
        {icon && onIconClick && (
          <button
            onClick={onIconClick}
            className="button-transparent absolute left-[8px] top-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-sm transition-all duration-300 ease-out"
            aria-label={iconAriaLabel}
            data-testid={dataTestId ? `${dataTestId}-icon-button` : 'input-icon-button'}
          >
            {icon}
          </button>
        )}

        {icon && !onIconClick && (
          <span
            className="absolute left-[16px] top-0 flex h-full items-center"
            data-testid={dataTestId ? `${dataTestId}-icon` : 'input-icon'}
          >
            {icon}
          </span>
        )}

        <input
          className={cn(
            'w-full rounded-sm border bg-component-secondary px-[16px] py-1 focus:border-primary focus:outline-none focus:ring-0',
            hasError && 'border-negative focus:border-negative',
            props.disabled && 'cursor-not-allowed bg-disabled',
            paddingY,
            className
          )}
          name={name}
          aria-invalid={hasError}
          value={props.value}
          {...props}
          type={props.type === 'password' ? inputType : props.type}
          data-testid={dataTestId}
        />
        {clearable && props.value && (
          <span
            className="absolute right-[16px] top-0 flex h-full cursor-pointer items-center"
            onClick={clearHandler}
            data-testid={dataTestId ? `${dataTestId}-clear-button` : 'input-clear-button'}
          >
            <CloseIcon />
          </span>
        )}
        {props.type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-ui-fg-subtle focus:text-ui-fg-base absolute right-0 top-4 px-4 outline-none transition-all duration-150 focus:outline-none"
            data-testid={dataTestId ? `${dataTestId}-password-button` : 'input-password-button'}
          >
            {showPassword ? <EyeMini /> : <EyeSlashMini />}
          </button>
        )}
      </div>
      {hasError && (
        <Error
          errors={errors}
          name={name}
          render={({ message }) => {
            return <ErrorMessage error={message} />;
          }}
        />
      )}
    </div>
  );
}
