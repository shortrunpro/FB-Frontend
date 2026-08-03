import { HttpTypes } from '@medusajs/types';

import { Cart } from '@/types/cart';

import { CartItemsProducts } from '../CartItemsProducts/CartItemsProducts';
import { EmptyCart } from './EmptyCart';

export const CartItems = ({ cart }: { cart: HttpTypes.StoreCart | Cart | null }) => {
  if (!cart) return null;

  if (!cart?.items || !cart?.items.length) return <EmptyCart />;

  return (
    <div
      className="mb-4"
      data-testid={`cart-items`}
    >
      <CartItemsProducts
        products={cart.items || []}
        currency_code={cart.currency_code}
      />
    </div>
  );
};
