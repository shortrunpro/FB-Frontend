import {
  AddressSection,
  PaymentSection,
  ShippingMethodsSection
} from '@/modules/checkout/sections';
import { CheckoutFormProps } from '@/modules/checkout/types';

const CheckoutForm = ({ cart, customer, availableShippingMethods }: CheckoutFormProps) => {
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
        clientKey={process.env.AUTHORIZENET_PUBLIC_CLIENT_KEY ?? ''}
        apiLoginID={process.env.AUTHORIZENET_PUBLIC_API_LOGIN_ID ?? ''}
      />
    </div>
  );
};

export default CheckoutForm;
