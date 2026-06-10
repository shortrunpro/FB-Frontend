'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { CheckCircleSolid } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { Heading, Text, useToggleState } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { setAddresses } from '@/lib/data/cart';
import compareAddresses from '@/lib/helpers/compare-addresses';
import { Button, ErrorMessage, Spinner } from '@/modules/common/components';

import ShippingAddressForm from './ShippingAddressForm';

export const AddressSection = ({
  cart,
  customer
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'address';
  // || !isAddress;

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const [state, formAction, isPending] = useActionState(setAddresses, {
    success: false,
    message: null
  });

  // TODO Move this logic somewhere more global
  // const isAddress = Boolean(
  //   cart?.shipping_address &&
  //   cart?.shipping_address.first_name &&
  //   cart?.shipping_address.last_name &&
  //   cart?.shipping_address.address_1 &&
  //   cart?.shipping_address.city &&
  //   cart?.shipping_address.postal_code &&
  //   cart?.shipping_address.country_code
  // );
  // useEffect(() => {
  //   if (!isAddress) {
  //     router.replace(pathname + '?step=address');
  //   }
  // }, [isAddress]);

  const handleEdit = () => {
    router.replace(pathname + '?step=address');
  };
  const handleSubmit = (data: FormData) => {
    startTransition(() => {
      formAction(data);
    });
    router.replace(`${pathname}?step=delivery`);
    router.refresh();
  };
  return (
    <div
      className="bg-ui-bg-interactive rounded-sm border p-4"
      data-testid="checkout-step-address"
    >
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline gap-x-2"
        >
          {!isOpen && <CheckCircleSolid />} Shipping Address
        </Heading>
        {!isOpen && (
          <Text>
            <Button
              onClick={handleEdit}
              variant="tonal"
              data-testid="checkout-address-edit-button"
            >
              Edit
            </Button>
          </Text>
        )}
      </div>
      <form action={data => handleSubmit(data)}>
        {isOpen ? (
          <div className="pb-8">
            <ShippingAddressForm
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />
            <Button
              className={`float-right mt-6 bg-brand text-white hover:bg-brand_grey hover:text-black ${isPending && 'flex min-w-[185px] justify-center'}`}
              loading={isPending}
              disabled={isPending}
              data-testid="submit-address-button"
              variant="tonal"
            >
              Continue to Delivery
            </Button>
            <ErrorMessage
              error={!state.success && state.message && state.message}
              data-testid="address-error-message"
            />
          </div>
        ) : (
          <div>
            <div className="text-small-regular">
              {cart && cart.shipping_address ? (
                <div className="flex items-start gap-x-8">
                  <div className="flex w-full items-start gap-x-1">
                    <div>
                      <Text className="txt-medium-plus font-bold">
                        {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                      </Text>
                      <Text>
                        {cart.shipping_address.address_1} {cart.shipping_address.address_2},{' '}
                        {cart.shipping_address.postal_code} {cart.shipping_address.city},{' '}
                        {cart.shipping_address.country_code?.toUpperCase()}
                      </Text>
                      <Text>
                        {cart.email}, {cart.shipping_address.phone}
                      </Text>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}
        {!searchParams.get('step') && (
          <LocalizedClientLink href="/checkout?step=delivery">
            <Button
              className="mt-6"
              variant="tonal"
            >
              Continue to Delivery
            </Button>
          </LocalizedClientLink>
        )}
      </form>
    </div>
  );
};
