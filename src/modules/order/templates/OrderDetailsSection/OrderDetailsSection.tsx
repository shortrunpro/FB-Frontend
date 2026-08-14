import { HttpTypes } from '@medusajs/types';

import { OrderAddresses, OrderParcels, OrderTotals } from '../../components';

export const OrderDetailsSection = ({ order }: { order: HttpTypes.StoreOrder }) => {
  return (
    <div>
      <OrderParcels order={order} />
      <OrderTotals totals={order} />
      {/* <OrderAddresses /> */}
    </div>
  );
};
