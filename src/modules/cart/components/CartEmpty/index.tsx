import Link from 'next/link';

import { Button } from '@/modules/common/components';

export function CartEmpty() {
  return (
    <div
      className="col-span-12 flex justify-center py-6 pt-4"
      data-testid="cart-empty"
    >
      <div className="flex w-[466px] flex-col">
        <h2 className="heading-lg text-center text-primary">SHOPPING CART</h2>
        <p className="mt-2 text-center text-lg text-secondary">
          Your shopping cart is currently empty
        </p>
        <Link
          href="/categories"
          className="mt-6"
        >
          <Button className="flex w-full items-center justify-center py-3">Explore</Button>
        </Link>
      </div>
    </div>
  );
}
