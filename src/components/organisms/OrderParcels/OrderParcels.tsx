import { OrderParcelActions } from '@/components/molecules/OrderParcelActions/OrderParcelActions';
import { OrderParcelItems } from '@/components/molecules/OrderParcelItems/OrderParcelItems';
import { OrderParcelStatus } from '@/components/molecules/OrderParcelStatus/OrderParcelStatus';
import { retrieveCustomer } from '@/lib/data/customer';

export const OrderParcels = async ({ order }: { order: any }) => {
  const user = await retrieveCustomer();

  return (
    <>
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
            <OrderParcelItems items={order.items} />
          </div>
          <div className="p-4">
            <OrderParcelActions order={order} />
          </div>
        </div>
      </div>
    </>
  );
};
