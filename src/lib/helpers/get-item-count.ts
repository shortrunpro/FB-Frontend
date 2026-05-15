import { HttpTypes } from '@medusajs/types';

import { Cart } from '@/types/cart';

export const getItemCount = (cart: HttpTypes.StoreCart | Cart | null) => {
  return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};
