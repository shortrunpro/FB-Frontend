import { format } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ArrowLeftIcon } from '@/icons';
import { retrieveCustomer } from '@/lib/data/customer';
import { retrieveOrder } from '@/lib/data/orders';
import { Button } from '@/modules/common/components';
import { OrderDetailsSection } from '@/modules/order/templates';
import { UserNavigation } from '@/modules/users/components';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await retrieveCustomer();
  const order = await retrieveOrder(id);

  if (!user) return redirect('/login');

  return (
    <main className="container">
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3">
          <Link href="/user/orders">
            <Button
              variant="tonal"
              className="label-md flex items-center gap-2 uppercase text-action-on-secondary"
            >
              <ArrowLeftIcon className="size-4" />
              All orders
            </Button>
          </Link>
          <div className="items-center justify-between sm:flex">
            <h1 className="heading-md my-8 uppercase">Order set #{order.display_id}</h1>
            <p className="label-md text-secondary">
              Order date:{' '}
              <span className="text-primary">{format(order.created_at || '', 'yyyy-MM-dd')}</span>
            </p>
          </div>
          <OrderDetailsSection order={order} />
        </div>
      </div>
    </main>
  );
}
