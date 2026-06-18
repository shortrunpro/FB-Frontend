import { HttpTypes } from '@medusajs/types';

export type StoreCardPaymentMethod = any & {
  service_zone?: {
    fulfillment_set: {
      type: string;
    };
  };
};
export type PaymentSectionProps = {
  cart: HttpTypes.StoreCart;
  clientKey: string;
  apiLoginID: string;
};
export type BasicCardInfo = {
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
};
