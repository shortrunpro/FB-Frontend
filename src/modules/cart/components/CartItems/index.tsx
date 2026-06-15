import { HttpTypes } from '@medusajs/types';

import { CartItemsFooter, CartItemsProducts } from '@/components/cells';
import { Cart } from '@/types/cart';

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
      <CartItemsFooter
        currency_code={cart.currency_code}
        price={cart.shipping_subtotal}
      />
    </div>
  );
};
