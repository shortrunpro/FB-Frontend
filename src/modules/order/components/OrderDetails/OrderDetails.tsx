import { HttpTypes } from '@medusajs/types';
import { Text } from '@medusajs/ui';
import { format } from 'date-fns';

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  return (
    <div className="bg-ui-bg-subtle grid rounded-sm border p-4 lg:grid-cols-2">
      <Text className="mt-2">
        <span className="block font-bold">Order date: </span>
        <span>{format(order.created_at, 'MM-dd-yyyy')}</span>
      </Text>
      {showStatus && (
        <div className="text-compact-small mt-4 flex items-center gap-x-4 lg:col-span-2">
          <>
            <Text>
              Order status:{' '}
              <span
                className="text-ui-fg-subtle"
                data-testid="order-status"
              >
                {/* TODO: Check where the statuses should come from */}
                {/* {formatStatus(order.fulfillment_status)} */}
              </span>
            </Text>
            <Text>
              Payment status:{' '}
              <span
                className="text-ui-fg-subtle"
                sata-testid="order-payment-status"
              >
                {/* {formatStatus(order.payment_status)} */}
              </span>
            </Text>
          </>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
