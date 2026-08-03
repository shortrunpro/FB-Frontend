'use client';

import { useCallback, useState } from 'react';

import { AddToCartButton } from '@/modules/common/components';

import { QuantityInput } from '../ProductVariants/QuantityInput';

interface InitialValue {
  [key: string]: number | string;
}
export const AddToCartSection = ({ variantId }: { variantId: string }) => {
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
    <div className="flex w-full items-end gap-x-6">
      <div className="w-2/12 px-2">
        <QuantityInput
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
  );
};
