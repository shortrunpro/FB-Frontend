'use client';

import { useState } from 'react';

import { ShoppingCart } from '@medusajs/icons';

import { addToCart } from '@/lib/data/cart';
import { cn } from '@/lib/utils';

import { Button } from '../Button';

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variantId: string;
  quantity: number;
  loading?: boolean;
}

export function AddToCartButton({ variantId, quantity }: AddToCartButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = async () => {
    setIsLoading(true);
    if (!quantity || Number(quantity) < 1) {
      return;
    }
    await addToCart({
      variantId,
      quantity: Number(quantity)
    })
      .catch(err => setError(JSON.stringify(err)))
      .finally(() => setIsLoading(false));
  };
  return (
    <Button
      onClick={handleAddToCart}
      loading={isLoading}
      disabled={isLoading || error ? true : false}
      className="flex w-full justify-center bg-yellow-500 font-extrabold uppercase text-white hover:bg-brand"
      data-testid="add-to-cart-button"
      id={variantId}
      aria-label="Add to Cart"
    >
      <span className="flex items-center gap-x-1">
        Add to Cart <ShoppingCart />
      </span>
    </Button>
  );
}
