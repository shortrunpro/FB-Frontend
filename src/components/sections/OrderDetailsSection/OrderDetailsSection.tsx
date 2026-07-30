import { OrderAddresses } from '@/components/organisms/OrderAddresses/OrderAddresses';
import { OrderParcels } from '@/components/organisms/OrderParcels/OrderParcels';
import { OrderTotals } from '@/components/organisms/OrderTotals/OrderTotals';

export const OrderDetailsSection = ({ order }: { order: any }) => {
  return (
    <div>
      <OrderParcels order={order} />
      <OrderTotals order={order} />
      {/* <OrderAddresses /> */}
    </div>
  );
};
