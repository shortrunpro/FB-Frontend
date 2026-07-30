import { redirect } from 'next/navigation';

import { retrieveCustomer } from '@/lib/data/customer';
import { LoginForm } from '@/modules/users/forms';

export default async function LoginPage() {
  const user = await retrieveCustomer();

  if (user) {
    redirect('/user');
  }

  return <LoginForm />;
}
