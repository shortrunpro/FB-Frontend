import { Card, Divider } from '@/components/atoms';
import { convertToLocale } from '@/lib/helpers/money';

export const OrderTotals = ({ order }: { order: any }) => {
  const delivery = order.shipping_total;
  const subtotal = order.total - delivery;
  const total = order.total;

  const currency_code = 'usd';

  return (
    <Card className="mb-8 p-4">
      <p className="label-md mb-2 flex justify-between text-secondary">
        Subtotal:
        <span className="text-primary">
          {convertToLocale({
            amount: subtotal,
            currency_code
          })}
        </span>
      </p>
      <p className="label-md flex justify-between text-secondary">
        Delivery:
        <span className="text-primary">
          {convertToLocale({
            amount: delivery,
            currency_code
          })}
        </span>
      </p>
      <Divider className="my-4" />
      <p className="label-md flex items-center justify-between text-secondary">
        Total:{' '}
        <span className="heading-md text-primary">
          {convertToLocale({
            amount: total,
            currency_code
          })}
        </span>
      </p>
    </Card>
  );
};
