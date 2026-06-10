import {
  AddressSection,
  PaymentSection,
  ShippingMethodsSection
} from '@/modules/checkout/sections';
import { CheckoutFormProps } from '@/modules/checkout/types';

const CheckoutForm = ({
  cart,
  customer,
  availableShippingMethods,
  availablePaymentMethods
}: CheckoutFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <AddressSection
        cart={cart}
        customer={customer}
      />
      <ShippingMethodsSection
        cart={cart}
        availableShippingMethods={availableShippingMethods}
      />
      <PaymentSection
        cart={cart}
        availablePaymentMethods={availablePaymentMethods}
      />
    </div>
  );
};

export default CheckoutForm;
