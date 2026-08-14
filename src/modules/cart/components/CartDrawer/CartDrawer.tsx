'use client';

import { useEffect } from 'react';

import { LockClosedSolidMini, ShoppingCart } from '@medusajs/icons';
import { Drawer, Text } from '@medusajs/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EcommerceItem, useEcommerceTracking } from '@/hooks/useEcommerceTracking';
import { usePrevious } from '@/hooks/usePrevious';
import { getItemCount } from '@/lib/helpers/get-item-count';
import { convertToLocale } from '@/lib/helpers/money';
import { useCartContext } from '@/modules/cart/provider/context';
import { Button, Spinner } from '@/modules/common/components';

import { CartItemsProducts } from '../CartItemsProducts/CartItemsProducts';

export const CartDrawer = () => {
  const { cart, open, toggleOpenState, isUpdating } = useCartContext();
  const { trackBeginCheckout } = useEcommerceTracking();
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
    toggleOpenState(false);
  };
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
        <Drawer.Content className="inset-y-0 z-50 m-0 max-w-screen-sm rounded-none bg-white p-0 data-[state=closed]:animate-fade-down-out data-[state=open]:animate-fade-in-up sm:right-0">
          {/* {!isUpdating && ( */}
          <div
            data-updating={isUpdating}
            className={`inset-0 z-50 flex items-center justify-center bg-slate-900/25 data-[updating=true]:fixed data-[updating=false]:hidden data-[updating=false]:animate-fade-down-out data-[updating=true]:animate-fade-in-up`}
          >
            <Spinner className="z-[99] h-16 w-16" />
          </div>

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

              <div className="flex w-full gap-x-2.5">
                <Link
                  href="/cart"
                  className="w-full"
                  onClick={handleCloseDrawer}
                >
                  <Button
                    className="w-full bg-brand hover:bg-[#374356]"
                    size="large"
                    disabled={isUpdating}
                  >
                    View Cart
                  </Button>
                </Link>
                <Link
                  href={'/checkout'}
                  className="w-full"
                  onClick={handleBeginCheckout}
                >
                  <Button
                    className="flex w-full items-center justify-center gap-x-1 bg-yellow-500 px-0 hover:bg-yellow-400"
                    size="large"
                    disabled={isUpdating}
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
