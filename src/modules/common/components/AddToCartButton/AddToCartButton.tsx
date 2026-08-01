'use client';

import { useEffect, useState } from 'react';

import { ShoppingCart } from '@medusajs/icons';

import medusaError from '@/lib/helpers/medusa-error';
import { useCartContext } from '@/modules/cart/provider/context';
import { BulkAddToCartParams } from '@/types/product';

import { Button } from '../Button';

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variantId?: string;
  quantity?: number;
  items?: BulkAddToCartParams;
  loading?: boolean;
  icon?: boolean;
}

export function AddToCartButton({ variantId, quantity, icon = true, items }: AddToCartButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleBulkAddToCart, addToCart, isAddingItem, isUpdating } = useCartContext();
  const handleAddToCart = async () => {
    setIsLoading(true);
    if (!items && (!variantId || !quantity || quantity < 1)) {
      setError('Missing necessary data for add to cart functionality');
      return setIsLoading(false);
    }
    if (items) {
      return await handleBulkAddToCart(items).catch(medusaError);
    }
    if (variantId && quantity && quantity > 0) {
      return await addToCart({ variantId, quantity }).catch(medusaError);
    }
  };
  useEffect(() => {
    if (!isAddingItem && !isUpdating) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isAddingItem, isUpdating]);
  return (
    <>
      {error && <span className="label-sm flex w-full justify-center text-negative">{error}</span>}
      <Button
        onClick={handleAddToCart}
        loading={isLoading}
        disabled={isLoading && (isAddingItem || isUpdating || error ? true : false)}
        className="flex w-full justify-center bg-yellow-500 font-extrabold uppercase text-white transition-all duration-300 ease-in-out hover:bg-yellow-400"
        data-testid="add-to-cart-button"
        id={variantId}
        aria-label="Add to Cart"
      >
        <span className="flex items-center gap-x-1">Add to Cart {icon && <ShoppingCart />}</span>
      </Button>
    </>
  );
}
