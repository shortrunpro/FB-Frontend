'use client';

import { useCallback, useState } from 'react';

import { AddToCartButton, ProductQuantityInput } from '@/modules/common/components';

interface InitialValue {
  [key: string]: number | string;
}
export const AddToCartSection = ({ variantId, price }: { variantId: string; price: number }) => {
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
      <div className="flex w-full items-end gap-x-6">
        <div className="w-2/12 px-2">
          <ProductQuantityInput
            id={variantId}
            initialQuantity={quantity[variantId]}
            onUpdate={handleQuantityChange}
          />
        </div>
        <div className="w-11/12">
          <AddToCartButton
            items={quantity}
            icon={false}
            disabled={!quantity || Number(quantity[variantId]) < 1}
          />
        </div>
      </div>
    </div>
  );
};
