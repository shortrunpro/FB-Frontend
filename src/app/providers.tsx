'use client';

import type React from 'react';
import { PropsWithChildren } from 'react';

import { StoreCart } from '@medusajs/types';

import { CartProvider } from '@/modules/cart/provider';
import { Cart } from '@/types/cart';

interface ProvidersProps extends PropsWithChildren {
  cart: Cart | StoreCart | null;
}

export function Providers({ children, cart }: ProvidersProps) {
  return <CartProvider cart={cart}>{children}</CartProvider>;
}
