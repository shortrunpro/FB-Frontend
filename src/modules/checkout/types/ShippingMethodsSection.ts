import type { HttpTypes } from '@medusajs/types';

export type StoreCardShippingMethod = HttpTypes.StoreCartShippingOption & {
  seller_id?: string;
  service_zone?: {
    fulfillment_set: {
      type: string;
    };
  };
};
export type ShippingMethods = {
  id: string;
  service: string;
  calculated_amount: number;
};

export type ShippingMethodsSectionProps = {
  cart: HttpTypes.StoreCart;
  availableShippingMethods: ShippingMethods[] | null;
};
