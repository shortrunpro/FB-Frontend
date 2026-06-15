import { Suspense } from 'react';

import { Metadata } from 'next';

import { Cart } from '@/components/sections';

// TODO Add appropriate metadata
export const metadata: Metadata = {
  title: 'Cart',
  description: 'My cart page'
};

export default function CartPage({}) {
  return (
    <main className="container flex gap-x-4">
      <Suspense fallback={<>Loading...</>}>
        <Cart />
      </Suspense>
    </main>
  );
}
