'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Heading, toast } from '@medusajs/ui';
import Link from 'next/link';
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';

import { Button, Card } from '@/components/atoms';
import { LabeledInput } from '@/components/cells';
import { PasswordValidator } from '@/components/cells/PasswordValidator/PasswordValidator';
import { updateCustomerPassword } from '@/lib/data/customer';

import { ProfilePasswordFormData, profilePasswordSchema } from './schema';

export const ProfilePasswordForm = ({ token }: { token?: string }) => {
  const form = useForm<ProfilePasswordFormData>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  return (
    <FormProvider {...form}>
      <Form
        form={form}
        token={token}
      />
    </FormProvider>
  );
};

const Form = ({
  form,
  token
}: {
  form: UseFormReturn<ProfilePasswordFormData>;
  token?: string;
}) => {
  const [success, setSuccess] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<FieldError | undefined>(
    undefined
  );
  const [newPasswordError, setNewPasswordError] = useState({
    isValid: false,
    lower: false,
    upper: false,
    '8chars': false,
    symbolOrDigit: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext();

  const updatePassword = async (data: FieldValues) => {
    if (form.getValues('confirmPassword') !== form.getValues('newPassword')) {
      setConfirmPasswordError({
        message: "Passwords don't match. Please enter correct password.",
        type: 'custom'
      } as FieldError);
      return;
    }

    setConfirmPasswordError(undefined);

    if (newPasswordError.isValid) {
      try {
        const res = await updateCustomerPassword(data.newPassword, token!);
        if (res.success) {
          setSuccess(true);
        } else {
          toast.error(res.error || 'Something went wrong');
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
  };

  return success ? (
    <div className="p-4">
      <Heading
        level="h1"
        className="heading-md text-center uppercase text-primary"
      >
        Password changed
      </Heading>
      <p className="my-8 text-center">Your are ready to log in with your new password</p>
      <Link href="/login">
        <Button
          className="w-full px-6 py-3 !font-semibold uppercase"
          size="large"
        >
          Log in
        </Button>
      </Link>
    </div>
  ) : (
    <form
      className="flex flex-col gap-4 px-4"
      onSubmit={handleSubmit(updatePassword)}
    >
      <Heading
        level="h1"
        className="heading-md uppercase text-primary"
      >
        Set new password
      </Heading>
      <p className="label-md text-secondary">
        Almost done. Enter your new password, and you&apos;re good to go.
      </p>
      <LabeledInput
        label="Password"
        type="password"
        error={errors.newPassword as FieldError}
        {...register('newPassword')}
      />
      <PasswordValidator
        password={form.watch('newPassword')}
        setError={setNewPasswordError}
      />
      <LabeledInput
        label="Confirm password"
        type="password"
        error={(confirmPasswordError || errors.confirmPassword) as FieldError}
        {...register('confirmPassword')}
      />
      <Button className="my-4 w-full uppercase">Set new password</Button>
    </form>
  );
};
