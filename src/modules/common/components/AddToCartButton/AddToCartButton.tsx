'use client';

import { useEffect, useState } from 'react';

import { ShoppingCart } from '@medusajs/icons';
import { StoreProduct, StoreProductVariant } from '@medusajs/types';

import { useEcommerceTracking } from '@/hooks/useEcommerceTracking';
import medusaError from '@/lib/helpers/medusa-error';
import { useCartContext } from '@/modules/cart/provider/context';
import { BulkAddToCartParams } from '@/types/product';
import { VariantsSearchResponse } from '@/types/variants';

import { Button } from '../Button/Button';

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product?: StoreProduct;
  product_variant?: StoreProductVariant | VariantsSearchResponse;
  variantId?: string;
  quantity?: number;
  items?: BulkAddToCartParams;
  loading?: boolean;
  icon?: boolean;
  variant?: 'base' | 'icon-only';
}

export function AddToCartButton({
  product_variant,
  product,
  variantId,
  quantity,
  icon = true,
  items,
  disabled,
  variant = 'base'
}: AddToCartButtonProps) {
  const { trackAddToCart } = useEcommerceTracking();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleBulkAddToCart, addToCart, isAddingItem, isUpdating } = useCartContext();
  const handleAddToCart = async () => {
    setError(null);
    const quantities = Object.values(items as BulkAddToCartParams).filter(
      f => typeof f === 'number' && f > 0
    );
    if (items && !quantities.length) {
      setError('Please select a quantity for at least one item');
      return setIsLoading(false);
    }
    if (!items && (!variantId || !quantity || quantity < 1 || quantities.length < 1)) {
      setError('Please select a quantity for at least one item');
      return setIsLoading(false);
    }
    setIsLoading(true);
    if (items) {
      return await handleBulkAddToCart(items)
        .then(() => {
          const itemMap = Object.keys(items)
            .map(key => ({ variant_id: key, quantity: Number(items[key]) }))
            .filter(item => item.quantity > 0)
            .flat()
            .map(i => {
              let find = product?.variants?.find(f => f.id === i.variant_id);
              return {
                item_id: find?.sku as string,
                item_category: product?.categories ? product.categories[0]?.name : '',
                item_name: find?.title as string,
                quantity: i.quantity as number,
                price: find?.calculated_price?.calculated_amount as number
              };
            });
          const value = itemMap.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;
          trackAddToCart(itemMap, value);
        })
        .catch(medusaError);
    }
    if (variantId && quantity && quantity > 0) {
      return await addToCart({ variantId, quantity })
        .then(() => {
          if (product_variant) {
            const item = {
              item_id: product_variant?.sku as string,
              item_name: product_variant?.title as string,
              price: product_variant?.calculated_price
                ? parseFloat((product_variant?.calculated_price as number).toFixed(2))
                : 0,
              quantity: quantity
            };
            const value = item.price * item.quantity;
            trackAddToCart([item], value);
          }
        })
        .catch(medusaError);
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
        disabled={(isLoading && (isAddingItem || isUpdating || error ? true : false)) || disabled}
        className="flex w-full items-center justify-center gap-x-2 bg-yellow-500 font-bold uppercase text-white hover:bg-yellow-400"
        data-testid="add-to-cart-button"
        id={variantId}
        aria-label="Add to Cart"
      >
        {variant === 'base' && `Add to Cart `}
        {(icon || variant === 'icon-only') && <ShoppingCart />}
      </Button>
    </>
  );
}
