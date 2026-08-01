import { useState } from 'react';

import { AddToCartButton, Button, Input } from '@/modules/common/components';

export const AddToCartSection = ({ variantId }: { variantId: string }) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantity(value);
  };
  return (
    <div className="flex w-full items-end gap-x-6">
      <div className="w-2/12 px-2">
        <Input
          label="Quantity"
          className="p-2 text-center"
          name="quantity"
          value={quantity}
          min={1}
          maxLength={3}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="w-11/12">
        <AddToCartButton
          variantId={variantId}
          quantity={Number(quantity)}
          icon={false}
        />
      </div>
    </div>
  );
};
