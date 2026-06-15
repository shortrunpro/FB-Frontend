import { OrderParcelActions } from '@/components/molecules/OrderParcelActions/OrderParcelActions';
import { OrderParcelItems } from '@/components/molecules/OrderParcelItems/OrderParcelItems';
import { OrderParcelStatus } from '@/components/molecules/OrderParcelStatus/OrderParcelStatus';
import { retrieveCustomer } from '@/lib/data/customer';

export const OrderParcels = async ({ orders }: { orders: any[] }) => {
  const user = await retrieveCustomer();

  return (
    <>
      {orders.map(order => (
        <div
          key={order.id}
          className="mb-8 w-full"
        >
          <div className="rounded-sm border bg-component-secondary p-4 font-semibold uppercase text-secondary">
            Order #{order.display_id}
          </div>
          <div className="rounded-sm border">
            <div className="border-b p-4">
              <OrderParcelStatus order={order} />
            </div>

            <div className="border-b p-4">
              <OrderParcelItems
                items={order.items}
                currency_code={order.currency_code}
              />
            </div>
            <div className="p-4">
              <OrderParcelActions order={order} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
