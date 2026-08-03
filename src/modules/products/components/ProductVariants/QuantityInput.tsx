'use client';

import { useState } from 'react';

// TODO verify button updates
import { Minus, Plus } from '@medusajs/icons';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import { useCartContext } from '@/modules/cart/provider/context';
import { Button, Input } from '@/modules/common/components';

interface QuantityInputProps {
  id: string;
  initialQuantity: number | string;
  onUpdate: (id: string, value: number) => void;
}
export const QuantityInput = ({ id, initialQuantity, onUpdate }: QuantityInputProps) => {
  const { isUpdating } = useCartContext();
  const [localValue, setLocalValue] = useState<any>(initialQuantity);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalValue(isNaN(val) ? 0 : val);
  };
  const plusHandler = () => {
    setLocalValue(Number(localValue) + 1);
    onUpdate(id, Number(localValue) + 1);
  };
  const minusHandler = () => {
    if (localValue > 0) {
      setLocalValue(Number(localValue) - 1);
      onUpdate(id, Number(localValue) - 1);
    }
  };
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onUpdate(id, Number(val));
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="tonal"
        size="small"
        onClick={minusHandler}
        disabled={localValue < 1 || isUpdating}
        className="rounded-full bg-transparent p-0 text-brand hover:bg-brand hover:text-white disabled:bg-transparent disabled:text-gray-400"
      >
        <FiMinusCircle size={'1.25rem'} />
      </Button>
      <div className="">
        <Input
          placeholder="0"
          className="px-2 py-2 text-center"
          id={id}
          value={localValue}
          maxLength={5}
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="quantity"
        />
      </div>

      <Button
        disabled={isUpdating}
        variant="tonal"
        size="small"
        onClick={plusHandler}
        className="rounded-full bg-transparent p-0 text-brand hover:bg-brand hover:text-white disabled:bg-transparent disabled:text-gray-400"
      >
        <FiPlusCircle size={'1.25rem'} />
      </Button>
    </div>
  );
};
