import { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveCart } from '@/lib/data/cart';
import { retrieveCustomer } from '@/lib/data/customer';
import { listCartShippingMethods } from '@/lib/data/fulfillment';
import { listCartPaymentMethods } from '@/lib/data/payment';
import { CheckoutForm, CheckoutSummary } from '@/modules/checkout/templates';
import { Spinner } from '@/modules/common/components';

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
  const customer = await retrieveCustomer();
  return (
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
  );
}
