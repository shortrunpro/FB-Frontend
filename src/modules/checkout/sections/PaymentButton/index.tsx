'use client';

import React, { useState } from 'react';

import { HttpTypes } from '@medusajs/types';

import { placeOrder } from '@/lib/data/cart';
import { Button, ErrorMessage } from '@/modules/common/components';

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
  'data-testid': string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ cart, 'data-testid': dataTestId }) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1;

  return <AuthnetPaymentButton notReady={notReady} />;
};

const AuthnetPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      const res = await placeOrder();
      if (!res.ok) {
        setErrorMessage(res.error?.message);
      }
    } catch (error: any) {
      if (error?.message !== 'NEXT_REDIRECT') {
        setErrorMessage(error?.message?.replace('Error setting up the request: ', ''));
        setSubmitting(false);
      }
    }
  };

  const handlePayment = () => {
    setSubmitting(true);
    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady || submitting}
        onClick={handlePayment}
        className={`w-full bg-brand text-white hover:bg-brand_grey hover:text-black`}
        loading={submitting}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  );
};

export default PaymentButton;
