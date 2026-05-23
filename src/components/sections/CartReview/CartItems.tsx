import { HttpTypes } from '@medusajs/types';

import { CartItemsProducts } from '@/components/cells';

export const CartItems = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  if (!cart) return null;

  return (
    <div className="mb-4">
      <CartItemsProducts
        delete_item={false}
        change_quantity={false}
        products={cart?.items || []}
        currency_code={cart.currency_code}
      />
    </div>
  );
};
