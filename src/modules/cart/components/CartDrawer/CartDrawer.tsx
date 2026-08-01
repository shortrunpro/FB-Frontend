'use client';

import { useEffect } from 'react';

import { LockClosedSolidMini, ShoppingCart } from '@medusajs/icons';
import { Drawer, Text } from '@medusajs/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/atoms';
import { usePrevious } from '@/hooks/usePrevious';
import { getItemCount } from '@/lib/helpers/get-item-count';
import { convertToLocale } from '@/lib/helpers/money';
import { useCartContext } from '@/modules/cart/provider/context';

import { CartItemsProducts } from '../CartItemsProducts/CartItemsProducts';

export const CartDrawer = () => {
  const { cart, open, toggleOpenState } = useCartContext();
  const pathname = usePathname();
  const previousItemCount = usePrevious(getItemCount(cart));
  const cartItemsCount = (cart && getItemCount(cart)) || 0;
  const handleCloseDrawer = () => {
    toggleOpenState(false);
  };
  const items = cart?.item_subtotal || 0;
  const subtotal = cart?.subtotal || 0;
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  /**
   * Synchronizes the cart drawer visibility based on cart state and navigation path.
   *
   * @description
   * 1 - Automatically closes the drawer if the user is currently on the checkout or cart page
   * 2 - Automatically opens the drawer if condition 1 is false and the cart item quantity has changed
   *
   * @listens cartItemCount - evaluates current item count in the cart
   * @listens previousItemCount - placeholder value used to identify changes in cart item quantity
   * @listens pathname - Evaluates current route to prevent opening the drawer on cart or checkout page
   */
  useEffect(() => {
    if (pathname === '/cart' || pathname === '/checkout') {
      return toggleOpenState(false);
    }
    if (previousItemCount !== undefined && cartItemsCount > previousItemCount) {
      return toggleOpenState(true);
    }
  }, [cartItemsCount, previousItemCount, pathname]);

  /**
   * Disabled the drawer from opening at all if on the cart or checkout page
   */
  return (
    <>
      {open && pathname !== '/cart' && pathname !== '/checkout' && (
        <div className="fixed inset-[-2rem] z-[99] p-0 backdrop-blur-sm" />
      )}
      <Drawer
        open={open && pathname !== '/cart' && pathname !== '/checkout'}
        onOpenChange={toggleOpenState}
      >
        <Drawer.Trigger asChild>
          <button className="transition-fg txt-compact-small-plus relative inline-flex w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full px-3 py-1.5 text-black outline-none hover:bg-neutral-100 lg:text-white">
            <ShoppingCart />
            <span className="text-sm sm:inline-block lg:hidden xl:inline-block">
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
        <Drawer.Content className="inset-y-0 z-50 m-0 w-fit max-w-full rounded-none bg-white p-0 data-[state=closed]:animate-fade-down-out data-[state=open]:animate-fade-in-up sm:right-0">
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
                closeDrawer={handleCloseDrawer}
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
                <Link
                  href="/cart"
                  className="w-full"
                  onClick={handleCloseDrawer}
                >
                  <Button
                    className="w-full bg-brand"
                    size="large"
                  >
                    View Cart
                  </Button>
                </Link>
                <Link
                  href={'/checkout'}
                  className="w-full"
                  onClick={handleCloseDrawer}
                >
                  <Button
                    className="flex w-full items-center justify-center gap-x-2 bg-yellow-500"
                    size="large"
                  >
                    <LockClosedSolidMini />
                    Secure Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  );
};
