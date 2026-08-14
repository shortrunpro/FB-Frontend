'use client';

import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from '@/modules/common/components';

type LabeledInputProps = {
  label: string;
  error?: FieldError | FieldErrors<FieldValues>;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LabeledInput = ({ error, label, className, name, ...props }: LabeledInputProps) => (
  <label className={cn('label-md-medium block', className)}>
    <p className={cn(error && 'text-negative')}>{label}</p>
    <Input
      className="py-2"
      errors={error}
      {...props}
      name={name}
    />
    {/* {error && <p className="label-sm text-negative">{error.message}</p>} */}
  </label>
);
