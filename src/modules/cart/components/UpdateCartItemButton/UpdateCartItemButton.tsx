'use client';

import { useEffect, useRef } from 'react';

import { toast } from '@/lib/helpers/toast';
import { useCartContext } from '@/modules/cart/provider/context';
import { ProductQuantityInput } from '@/modules/common/components';

export const UpdateCartItemButton = ({
  quantity,
  lineItemId
}: {
  quantity: number;
  lineItemId: string;
}) => {
  const { updateCartItem } = useCartContext();
  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        await updateCartItem(lineItemId, newQuantity);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message.replace('Error setting up the request: ', '')
            : 'Failed to update quantity';
        toast.error({
          title: 'Error updating cart',
          description: errorMessage
        });
      }
    }, 500);
  };

  return (
    <div className="mt-2 flex w-1/2">
      <ProductQuantityInput
        id={lineItemId}
        initialQuantity={quantity}
        onUpdate={handleQuantityChange}
      />
    </div>
  );
};
