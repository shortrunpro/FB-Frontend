'use client';

import { LockClosedSolidMini } from '@medusajs/icons';
import Link from 'next/link';

import { EcommerceItem, useEcommerceTracking } from '@/hooks/useEcommerceTracking';
import { CartEmpty, CartItems, CartSummary } from '@/modules/cart/components';
import { useCartContext } from '@/modules/cart/provider/context';
import { Button, Spinner } from '@/modules/common/components';

export const Cart = () => {
  const { cart, isUpdating } = useCartContext();
  const { trackBeginCheckout } = useEcommerceTracking();
  if (!cart || !cart.items?.length) {
    return <CartEmpty />;
  }
  const handleBeginCheckout = () => {
    const items =
      cart?.items &&
      (cart?.items.map(m => ({
        item_id: m.variant_sku,
        item_name: m.title,
        price: m.unit_price,
        quantity: m.quantity,
        item_category: m?.product?.categories ? m?.product?.categories[0]?.name : null
      })) as EcommerceItem[]);
    items && trackBeginCheckout(items, cart?.total);
  };
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
          <Link
            href="/checkout?step=address"
            onClick={handleBeginCheckout}
          >
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
