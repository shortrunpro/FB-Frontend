import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useEcommerceTracking } from '@/hooks/useEcommerceTracking';
import { initiatePaymentSession } from '@/lib/data/cart';
import { CheckoutCart } from '@/modules/checkout/types/PaymentSection';
import { Button } from '@/modules/common/components';

interface CreditPaymentOptionProps {
  cart: CheckoutCart;
}
export const CreditPaymentOption = ({ cart }: CreditPaymentOptionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { trackAddPaymentInfo, handleMapCartItems } = useEcommerceTracking();
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const provider = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER_ID ?? '';
      const { billing_address, shipping_address, email, customer } = cart;
      // if (!checkActiveSession && response?.messages?.resultCode === 'Ok') {
      await initiatePaymentSession(cart, {
        provider_id: provider,
        data: {
          use_credit: true,
          dataValue: null,
          customer,
          email,
          billing_address,
          shipping_address
        }
      });
      const data = cart.items && handleMapCartItems(cart.items);
      data && trackAddPaymentInfo(data.items, data.value);
      router.push(pathname + '?step=review', { scroll: false });
      router.refresh();
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <Button
        className="w-full bg-brand py-1"
        variant="brand"
        onClick={handleSubmit}
      >
        Continue to Review
      </Button>
    </div>
  );
};
