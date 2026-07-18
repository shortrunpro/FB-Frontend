'use client';

import { useEffect, useState } from 'react';

import { LockClosedSolidMini, ShoppingCart } from '@medusajs/icons';
import { Drawer, Text } from '@medusajs/ui';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/atoms';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { usePrevious } from '@/hooks/usePrevious';
import { filterValidCartItems } from '@/lib/helpers/filter-valid-cart-items';
import { getItemCount } from '@/lib/helpers/get-item-count';
import { convertToLocale } from '@/lib/helpers/money';
import { useCartContext } from '@/modules/cart/provider/context';

import { CartItemsProducts } from '../CartItemsProducts/CartItemsProducts';

export const CartDrawer = () => {
  const { cart } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const previousItemCount = usePrevious(getItemCount(cart));
  const cartItemsCount = (cart && getItemCount(cart)) || 0;
  const pathname = usePathname();

  // Filter out items with invalid data (missing prices/variants)
  const validItems = filterValidCartItems(cart?.items);

  const total = cart?.total || 0;

  const delivery = cart?.shipping_subtotal || 0;

  const tax = cart?.tax_total || 0;

  const items = cart?.item_subtotal || 0;
  const subtotal = cart?.subtotal || 0;
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  useEffect(() => {
    if (
      previousItemCount !== undefined &&
      cartItemsCount > previousItemCount &&
      pathname.split('/')[2] !== 'cart'
    ) {
      open();
    }
  }, [cartItemsCount, previousItemCount, pathname]);

  return (
    <>
      {isOpen && <div className="fixed inset-[-2rem] z-[99] p-0 backdrop-blur-sm" />}
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Drawer.Trigger asChild>
          <button className="transition-fg txt-compact-small-plus relative inline-flex w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full px-3 py-1.5 outline-none hover:bg-neutral-100">
            <ShoppingCart />
            <span className="small:inline-block text-sm">
              {cart && items && cart?.items && cart.items.length > 0
                ? convertToLocale({
                    amount: subtotal,
                    currency_code: 'usd'
                  })
                : 'Cart'}
            </span>
            <div className="rounded-full bg-blue-500 px-1.5 py-px text-xs text-white">
              {totalItems}
            </div>
          </button>
        </Drawer.Trigger>
        <Drawer.Content className="inset-y-0 z-50 m-0 w-1/3 rounded-none bg-white p-0 sm:right-0">
          <Drawer.Header className="flex self-center">
            <Drawer.Title>
              {totalItems > 0 ? `You have ${totalItems} items in your cart` : 'Your cart is empty'}
            </Drawer.Title>
          </Drawer.Header>
          <div className="flex h-full flex-col justify-between self-stretch overflow-auto">
            {cart && cart.items && cart.items.length && (
              <CartItemsProducts
                products={cart.items}
                currency_code="usd"
              />
            )}

            <div className="flex w-full flex-col gap-y-3 p-4">
              <div className="flex justify-between">
                <Text>Subtotal</Text>
                <Text>
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: 'usd'
                  })}
                </Text>
              </div>

              <div className="flex w-full gap-x-6">
                <LocalizedClientLink
                  href="/cart"
                  className="w-full"
                >
                  <Button
                    className="w-full bg-brand"
                    size="large"
                  >
                    View Cart
                  </Button>
                </LocalizedClientLink>
                <LocalizedClientLink
                  href={'/checkout'}
                  className="w-full"
                >
                  <Button
                    className="flex w-full items-center justify-center gap-x-2 bg-yellow-500"
                    size="large"
                  >
                    <LockClosedSolidMini />
                    Secure Checkout
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  );
};
