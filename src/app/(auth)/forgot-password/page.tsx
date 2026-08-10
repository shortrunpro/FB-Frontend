import { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components/molecules/ForgotPasswordForm/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Create a new password'
};

export default function ForgotPasswordPage() {
  return (
    <main className="container">
      <ForgotPasswordForm />
    </main>
  );
}
