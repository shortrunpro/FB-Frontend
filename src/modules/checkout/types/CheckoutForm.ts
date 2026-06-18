import { HttpTypes } from '@medusajs/types';

import { ShippingMethods } from '@/modules/checkout/types';

export type CheckoutFormProps = {
  cart: HttpTypes.StoreCart;
  customer: HttpTypes.StoreCustomer | null;
  availableShippingMethods: ShippingMethods[] | null;
};
