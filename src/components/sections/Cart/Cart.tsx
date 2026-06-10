'use client';

import { LockClosedSolidMini } from '@medusajs/icons';

import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { CartEmpty, CartItems, CartSummary } from '@/modules/cart/components';
import { useCartContext } from '@/modules/cart/provider/context';
import { Button } from '@/modules/common/components';

export const Cart = () => {
  const { cart } = useCartContext();

  if (!cart || !cart.items?.length) {
    return <CartEmpty />;
  }

  return (
    <>
      <div className="w-2/3">
        <CartItems cart={cart} />
      </div>
      <div className="w-1/3">
        <div className="h-fit rounded-sm border p-4">
          <CartSummary
            item_total={cart?.item_subtotal || 0}
            shipping_total={cart?.shipping_subtotal || 0}
            total={cart?.total || 0}
            currency_code={cart?.currency_code || ''}
            tax={cart?.tax_total || 0}
            discount_total={cart?.discount_total || 0}
          />
          <LocalizedClientLink href="/checkout?step=address">
            <Button
              className="flex w-full items-center justify-center gap-x-2 bg-brand hover:bg-brand_grey hover:text-black"
              size="large"
            >
              <LockClosedSolidMini />
              Secure Checkout
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  );
};
