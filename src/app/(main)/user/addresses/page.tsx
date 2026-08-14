import { redirect } from 'next/navigation';

import { retrieveCustomer } from '@/lib/data/customer';
import { listRegions } from '@/lib/data/regions';
import { UserNavigation } from '@/modules/users/components';
import { Addresses } from '@/modules/users/templates';

export default async function Page() {
  const user = await retrieveCustomer();
  const regions = await listRegions();

  if (!user) {
    redirect('/login');
  }

  return (
    <main
      className="container"
      data-testid="addresses-page"
    >
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
        <UserNavigation />
        <Addresses {...{ user, regions }} />
      </div>
    </main>
  );
}
