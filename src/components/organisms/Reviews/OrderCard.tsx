import { format } from 'date-fns';
import Image from 'next/image';

import { Button, Card, StarRating } from '@/components/atoms';
import { Order } from '@/lib/data/reviews';

export const OrderCard = ({
  order,
  showForm,
  testIdPrefix
}: {
  order: Order;
  showForm?: (review: Order) => void;
  testIdPrefix?: string;
}) => {
  return (
    <Card
      className="flex w-full justify-between gap-6 px-4"
      data-testid={testIdPrefix}
    >
      <div className="flex gap-4 max-lg:items-center">
        <div>
          {order?.items?.[0]?.thumbnail ? (
            <Image
              alt="photo"
              src={order.items[0].thumbnail}
              className="border-base-primary rounded-xs border"
              width={64}
              height={64}
              data-testid={testIdPrefix ? `${testIdPrefix}-thumbnail` : undefined}
            />
          ) : (
            <Image
              alt="photo"
              src={'/images/placeholder.svg'}
              className="scale-75 opacity-25"
              width={64}
              height={64}
              data-testid={testIdPrefix ? `${testIdPrefix}-placeholder` : undefined}
            />
          )}
        </div>
        <div>
          <p
            className="label-md text-secondary"
            data-testid={testIdPrefix ? `${testIdPrefix}-subtitle` : undefined}
          >
            {order?.items?.[0]?.subtitle}
          </p>
          <p
            className="label-md text-secondary"
            data-testid={testIdPrefix ? `${testIdPrefix}-date` : undefined}
          >
            Date: {format(order.created_at, 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {showForm ? (
          <div className="flex w-full justify-end">
            <Button
              onClick={() => showForm(order)}
              className="w-fit uppercase"
              data-testid={testIdPrefix ? `${testIdPrefix}-write-review-button` : undefined}
            >
              Write review
            </Button>
          </div>
        ) : (
          <div className="-mt-2 h-full max-w-full">
            <p
              className="text-sm text-secondary"
              data-testid={testIdPrefix ? `${testIdPrefix}-review-date` : undefined}
            >
              {format(order.reviews[0].created_at, 'MMM dd, yyyy')}
            </p>
            <StarRating
              rate={order.reviews[0].rating}
              starSize={12}
            />
            <p
              className="label-md mt-2 whitespace-pre-line break-words"
              data-testid={testIdPrefix ? `${testIdPrefix}-review-note` : undefined}
            >
              {order.reviews[0].customer_note}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
