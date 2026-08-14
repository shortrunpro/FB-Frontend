import { HttpTypes } from '@medusajs/types';
import { Table } from '@medusajs/ui';

import { Divider } from '@/components/atoms';

import { Item } from './Item';

type ItemsProps = {
  order: HttpTypes.StoreOrder;
};

const OrderItems = ({ order }: ItemsProps) => {
  const items = order.items;

  return (
    <div className="flex flex-col">
      {(items ?? [])
        .sort((a, b) => {
          return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1;
        })
        .map(item => {
          return (
            <Item
              key={item.id}
              item={item}
            />
          );
        })}
    </div>
  );
};

export default OrderItems;
