import { OrderProductListItem } from '@/components/cells';

export const OrderParcelItems = ({ items }: { items: any[] }) => {
  return (
    <>
      {items.map(item => (
        <OrderProductListItem
          key={item.id + item.variant_id}
          item={item}
        />
      ))}
    </>
  );
};
