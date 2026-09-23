import { HttpTypes } from '@medusajs/types';

export type StoreCardPaymentMethod = any & {
  service_zone?: {
    fulfillment_set: {
      type: string;
    };
  };
};
export interface CheckoutCart extends HttpTypes.StoreCart {
  customer?: {
    id: string;
    email: string;
    groups:
      | {
          id: string;
          name: string;
        }[]
      | [];
  };
}
export type PaymentSectionProps = {
  cart: CheckoutCart;
  clientKey: string;
  apiLoginID: string;
};
export type BasicCardInfo = {
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
};
