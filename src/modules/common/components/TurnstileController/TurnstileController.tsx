'use client';

import { ErrorMessage as Error } from '@hookform/error-message';
import { Turnstile } from 'next-turnstile';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

import { TURNSTILE_SITE_KEY } from '@/lib/config';

import ErrorMessage from '../ErrorMessage';

interface TurnstileControllerProps {
  control: Control<FieldValues, any, FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const TurnstileController = ({ control, errors }: TurnstileControllerProps) => {
  return (
    <div>
      <Controller
        name="turnstileToken"
        control={control}
        rules={{ required: 'Please complete the security check' }}
        render={({ field: { onChange } }) => (
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={token => onChange(token)} // next-turnstile uses onVerify
            onExpire={() => onChange('')}
            onError={() => onChange('')}
            theme="light"
          />
        )}
      />
      {errors.turnstileToken && (
        <Error
          errors={errors}
          name={'turnstileToken'}
          render={({ message }) => {
            return <ErrorMessage error={message} />;
          }}
        />
      )}
    </div>
  );
};
