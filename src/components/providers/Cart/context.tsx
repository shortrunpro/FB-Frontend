'use client';

import { createContext, useContext } from 'react';

import { StoreCart } from '@medusajs/types';

import { Cart, StoreCartLineItemOptimisticUpdate } from '@/types/cart';

interface CartContextInterface {
  cart: Cart | StoreCart | null;
  onAddToCart: (item: StoreCartLineItemOptimisticUpdate, currency_code: string) => void;
  addToCart: (params: {
    variantId: string;
    quantity: number;
    countryCode: string;
  }) => Promise<void>;
  removeCartItem: (lineId: string) => Promise<void>;
  updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<Cart | StoreCart | null>;
  isUpdating: boolean;
  isAddingItem: boolean;
  isUpdatingItem: boolean;
  isRemovingItem: boolean;
}

export const CartContext = createContext<CartContextInterface | null>(null);

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
