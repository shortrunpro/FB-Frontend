import { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Spinner } from '@/components/atoms/Spinner/Spinner';
import PaymentWrapper from '@/components/organisms/PaymentContainer/PaymentWrapper';
import { retrieveCart } from '@/lib/data/cart';
import { retrieveCustomer } from '@/lib/data/customer';
import { listCartShippingMethods } from '@/lib/data/fulfillment';
import { listCartPaymentMethods } from '@/lib/data/payment';
import { CheckoutForm, CheckoutSummary } from '@/modules/checkout/templates';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'My cart page - Checkout'
};

export default async function CheckoutPage({}) {
  return (
    <Suspense
      fallback={
        <div
          className="container flex min-h-lvh items-center justify-center"
          data-testid="checkout-page-loading"
        >
          <Spinner />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}

async function CheckoutPageContent({}) {
  const cart = await retrieveCart();

  if (!cart) {
    return notFound();
  }
  const shippingMethods = await listCartShippingMethods(cart.id, false);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '');
  const customer = await retrieveCustomer();
  return (
    <PaymentWrapper cart={cart}>
      <main
        className="container min-h-svh"
        data-testid="checkout-page"
      >
        <div className="grid gap-8 lg:grid-cols-11">
          <div
            className="lg:col-span-6"
            data-testid="checkout-steps-container"
          >
            <CheckoutForm
              cart={cart}
              customer={customer}
              availableShippingMethods={shippingMethods as any}
              availablePaymentMethods={paymentMethods}
            />
          </div>
          <div
            className="lg:col-span-5"
            data-testid="checkout-review-container"
          >
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </main>
    </PaymentWrapper>
  );
}
