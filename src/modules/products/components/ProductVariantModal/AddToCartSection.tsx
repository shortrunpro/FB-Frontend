'use client';

import { useCallback, useState } from 'react';

import { useScreenSize } from '@/hooks/useScreenSize';
import { AddToCartButton, ProductQuantityInput } from '@/modules/common/components';

interface InitialValue {
  [key: string]: number | string;
}
export const AddToCartSection = ({ variantId, price }: { variantId: string; price: number }) => {
  const screen = useScreenSize();
  const [quantity, setQuantity] = useState<InitialValue>({
    [variantId]: 1
  });
  const handleQuantityChange = useCallback((id: string, newValue: number) => {
    setQuantity(prev => ({
      ...prev,
      [id]: newValue
    }));
  }, []);
  return (
    <div className="flex w-full flex-col gap-y-6">
      <span
        id="product_price"
        className="label-xl text-brand"
      >
        ${price}
      </span>
      <div className="flex w-full flex-col items-end gap-6 md:flex-row">
        <div className="w-full px-16 md:w-1/2 md:px-0">
          <ProductQuantityInput
            id={variantId}
            initialQuantity={quantity[variantId]}
            onUpdate={handleQuantityChange}
          />
        </div>
        <div className="w-full">
          <AddToCartButton
            items={quantity}
            icon={false}
            variant={screen === 'sm' ? 'icon-only' : 'base'}
            disabled={!quantity || Number(quantity[variantId]) < 1}
          />
        </div>
      </div>
    </div>
  );
};
