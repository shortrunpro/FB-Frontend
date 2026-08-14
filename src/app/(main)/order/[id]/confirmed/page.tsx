import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveOrder } from '@/lib/data/orders';
import { OrderConfirmedSection } from '@/modules/order/templates';

type Props = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'You purchase was successful'
};

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    return notFound();
  }

  return (
    <>
      <link
        rel="dns-prefetch"
        href="https://www.shopperapproved.com"
      />
      <link
        rel="preconnect"
        href="https://www.shopperapproved.com"
        crossOrigin="anonymous"
      />
      <main className="container min-h-[50vh] flex-grow">
        <OrderConfirmedSection order={order} />
      </main>
    </>
  );
}
