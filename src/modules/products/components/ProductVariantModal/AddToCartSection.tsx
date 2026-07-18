import { useState } from 'react';

import { addToCart } from '@/lib/data/cart';
import { Button, Input } from '@/modules/common/components';

export const AddToCartSection = ({ variantId }: { variantId: string }) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantity(value);
  };
  const handleAddToCart = async () => {
    setSubmitting(true);
    if (!quantity || Number(quantity) < 1) {
      return;
    }
    await addToCart({
      variantId,
      quantity: Number(quantity)
    }).finally(() => setSubmitting(false));
  };
  return (
    <div className="flex w-full items-end gap-x-6">
      <div className="w-2/12 px-2">
        <Input
          label="Quantity"
          className="p-2 text-center"
          value={quantity}
          min={1}
          maxLength={3}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="w-11/12">
        <Button
          variant={'tonal'}
          className="w-full bg-brand text-white transition-transform hover:text-black"
          onClick={handleAddToCart}
          disabled={submitting}
          loading={submitting}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};
