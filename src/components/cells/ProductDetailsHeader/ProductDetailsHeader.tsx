'use client';

import { useState } from 'react';

import { HttpTypes } from '@medusajs/types';

import { Button, Input } from '@/components/atoms';
import { ProductVariants } from '@/components/molecules';
import { ProductFiles } from '@/components/organisms';
import { useCartContext } from '@/components/providers';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import { getProductPrice } from '@/lib/helpers/get-product-price';
import { toast } from '@/lib/helpers/toast';
import { ProductWithFiles } from '@/types/product';

const optionsAsKeymap = (variantOptions: HttpTypes.StoreProductVariant['options']) => {
  return variantOptions?.reduce(
    (acc: Record<string, string>, varopt: HttpTypes.StoreProductOptionValue) => {
      acc[varopt.option?.title.toLowerCase() || ''] = varopt.value;

      return acc;
    },
    {}
  );
};

export const ProductDetailsHeader = ({ product }: { product: ProductWithFiles }) => {
  const { addToCart, onAddToCart, cart, isAddingItem } = useCartContext();
  const { allSearchParams } = useGetAllSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { cheapestVariant, cheapestPrice } = getProductPrice({
    product
  });

  // Check if product has any valid prices in current region
  const hasAnyPrice = cheapestPrice !== null && cheapestVariant !== null;

  // set default variant
  const selectedVariant = hasAnyPrice
    ? {
        ...optionsAsKeymap(cheapestVariant.options ?? null),
        ...allSearchParams
      }
    : allSearchParams;

  // get selected variant id
  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.every((option: any) =>
        selectedVariant[option.option?.title.toLowerCase() || '']?.includes(option.value)
      )
    )?.id || '';

  // get variant price
  const { variantPrice } = getProductPrice({
    product,
    variantId
  });

  const variantStock =
    product.variants?.find(({ id }) => id === variantId)?.inventory_quantity || 0;

  const variantHasPrice = !!product.variants?.find(({ id }) => id === variantId)?.calculated_price;

  const isVariantStockMaxLimitReached =
    (cart?.items?.find(item => item.variant_id === variantId)?.quantity ?? 0) >= variantStock;

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variantId || !hasAnyPrice || isVariantStockMaxLimitReached) return;

    const subtotal = +(variantPrice?.calculated_price_without_tax_number || 0);
    const total = +(variantPrice?.calculated_price_number || 0);

    const storeCartLineItem = {
      thumbnail: product.thumbnail || '',
      product_title: product.title,
      quantity,
      subtotal,
      total,
      tax_total: total - subtotal,
      variant_id: variantId,
      product_id: product.id,
      variant: product.variants?.find(({ id }) => id === variantId)
    };

    // Optimistic update
    onAddToCart(storeCartLineItem, 'usd');

    try {
      await addToCart({
        variantId: variantId,
        quantity,
        countryCode: 'us'
      });
    } catch (error) {
      toast.error({
        title: 'Error adding to cart',
        description: 'Some variant does not have the required inventory'
      });
    }
  };

  const isAddToCartDisabled =
    !variantStock || !variantHasPrice || !hasAnyPrice || isVariantStockMaxLimitReached;

  const updateQuantity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuantity(Number(e.target.value));
  };
  return (
    <div
      className="rounded-sm border p-5"
      data-testid="product-details-header"
    >
      <div className="flex justify-between">
        <div>
          <h1
            className="heading-lg text-primary"
            data-testid="product-title"
          >
            {product.title}
          </h1>
        </div>
      </div>
      {/* Product Variants */}
      {hasAnyPrice && (
        <ProductVariants
          product={product}
          selectedVariant={selectedVariant}
        />
      )}
      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
        loading={isAddingItem}
        className="mb-4 flex w-full justify-center bg-yellow-500 font-extrabold uppercase text-brand"
        size="small"
        data-testid="product-add-to-cart-button"
      >
        {!hasAnyPrice
          ? 'NOT AVAILABLE IN YOUR REGION'
          : variantStock && variantHasPrice
            ? 'ADD TO CART'
            : 'OUT OF STOCK'}
      </Button>
      <div
        className="mt-2 flex items-center gap-2"
        data-testid="product-price-container"
      >
        {hasAnyPrice && variantPrice ? (
          <>
            <span
              className="heading-md text-primary"
              data-testid="product-price-current"
            >
              {variantPrice.calculated_price}
            </span>
            {variantPrice.calculated_price_number !== variantPrice.original_price_number && (
              <span
                className="label-md text-secondary line-through"
                data-testid="product-price-original"
              >
                {variantPrice.original_price}
              </span>
            )}
          </>
        ) : (
          <span
            className="label-md pb-4 pt-2 text-secondary"
            data-testid="product-price-unavailable"
          >
            Not available in your region
          </span>
        )}
        <div className="flex items-center gap-x-2 p-3">
          <span className="font-semibold text-brand">Quantity</span>

          <Input
            value={quantity}
            onChange={updateQuantity}
            className="m-0 w-1/4 bg-transparent p-0 py-2 text-center"
          />
        </div>
      </div>
      <ProductFiles files={product.files} />
    </div>
  );
};
