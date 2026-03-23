'use client';

import { useEffect, useState } from 'react';

import { ShoppingCart } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { usePathname } from 'next/navigation';

import { Badge, Button } from '@/components/atoms';
import { CartDropdownItem, Dropdown } from '@/components/molecules';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { useCartContext } from '@/components/providers';
import { usePrevious } from '@/hooks/usePrevious';
import { filterValidCartItems } from '@/lib/helpers/filter-valid-cart-items';
import { convertToLocale } from '@/lib/helpers/money';

const getItemCount = (cart: HttpTypes.StoreCart | null) => {
  return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};

export const CartDropdown = () => {
  const { cart } = useCartContext();
  const [open, setOpen] = useState(false);

  const previousItemCount = usePrevious(getItemCount(cart));
  const cartItemsCount = (cart && getItemCount(cart)) || 0;
  const pathname = usePathname();

  // Filter out items with invalid data (missing prices/variants)
  const validItems = filterValidCartItems(cart?.items);

  const total = convertToLocale({
    amount: cart?.total || 0,
    currency_code: cart?.currency_code || 'eur'
  });

  const delivery = convertToLocale({
    amount: cart?.shipping_subtotal || 0,
    currency_code: cart?.currency_code || 'eur'
  });

  const tax = convertToLocale({
    amount: cart?.tax_total || 0,
    currency_code: cart?.currency_code || 'eur'
  });

  const items = convertToLocale({
    amount: cart?.item_subtotal || 0,
    currency_code: cart?.currency_code || 'eur'
  });

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (
      previousItemCount !== undefined &&
      cartItemsCount > previousItemCount &&
      pathname.split('/')[2] !== 'cart'
    ) {
      setOpen(true);
    }
  }, [cartItemsCount, previousItemCount]);

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <LocalizedClientLink
        href="/cart"
        className="relative"
        aria-label="Go to cart"
      >
        <ShoppingCart />
        {Boolean(cartItemsCount) && (
          <Badge className="absolute -right-2 -top-2 h-4 w-4 p-0">{cartItemsCount}</Badge>
        )}
      </LocalizedClientLink>
      <Dropdown show={open}>
        <div className="shadow-lg lg:w-[460px]">
          <h3 className="heading-md border-b p-4 uppercase">Shopping cart</h3>
          <div className="p-4">
            {Boolean(cartItemsCount) ? (
              <div>
                <div className="no-scrollbar max-h-[360px] overflow-y-scroll">
                  {validItems.map(item => (
                    <CartDropdownItem
                      key={`${item.product_id}-${item.variant_id}`}
                      item={item}
                      currency_code={cart?.currency_code || 'eur'}
                    />
                  ))}
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between text-secondary">
                    Items <p className="label-md text-primary">{items}</p>
                  </div>
                  <div className="flex items-center justify-between text-secondary">
                    Delivery <p className="label-md text-primary">{delivery}</p>
                  </div>
                  <div className="flex items-center justify-between text-secondary">
                    Tax <p className="label-md text-primary">{tax}</p>
                  </div>
                  <div className="flex items-center justify-between text-secondary">
                    Total <p className="label-xl text-primary">{total}</p>
                  </div>
                  <LocalizedClientLink href="/cart">
                    <Button className="mt-4 w-full py-3">Go to cart</Button>
                  </LocalizedClientLink>
                </div>
              </div>
            ) : (
              <div className="px-8">
                <h4 className="heading-md text-center uppercase">Your shopping cart is empty</h4>
                <p className="py-4 text-center text-lg">Are you looging for inspiration?</p>
                <LocalizedClientLink href="/categories">
                  <Button className="w-full py-3">Explore Home Page</Button>
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
