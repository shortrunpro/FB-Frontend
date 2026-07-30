import { redirect } from 'next/navigation';

import { retrieveCustomer } from '@/lib/data/customer';
import { RegisterForm } from '@/modules/users/forms';

export default async function RegisterPage() {
  const user = await retrieveCustomer();

  if (user) {
    redirect('/user');
  }

  return <RegisterForm />;
}
