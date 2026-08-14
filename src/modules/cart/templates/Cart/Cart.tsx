'use client';

import { LockClosedSolidMini } from '@medusajs/icons';
import Link from 'next/link';

import { CartEmpty, CartItems, CartSummary } from '@/modules/cart/components';
import { useCartContext } from '@/modules/cart/provider/context';
import { Button, Spinner } from '@/modules/common/components';

export const Cart = () => {
  const { cart, isUpdating } = useCartContext();

  if (!cart || !cart.items?.length) {
    return <CartEmpty />;
  }

  return (
    <>
      <div
        data-updating={isUpdating}
        className={`inset-0 z-50 flex items-center justify-center bg-slate-900/25 data-[updating=true]:fixed data-[updating=false]:hidden data-[updating=false]:animate-fade-down-out data-[updating=true]:animate-fade-in-up`}
      >
        <Spinner className="z-[99] h-16 w-16" />
      </div>
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
          <Link href="/checkout?step=address">
            <Button
              className="flex w-full items-center justify-center gap-x-2 bg-yellow-500 hover:bg-yellow-400"
              size="large"
              disabled={isUpdating}
            >
              <LockClosedSolidMini />
              Secure Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
