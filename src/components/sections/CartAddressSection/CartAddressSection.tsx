'use client';

import { useActionState, useEffect } from 'react';

import { CheckCircleSolid } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { Heading, Text, useToggleState } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/atoms';
import ErrorMessage from '@/components/molecules/ErrorMessage/ErrorMessage';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import ShippingAddress from '@/components/organisms/ShippingAddress/ShippingAddress';
import Spinner from '@/icons/spinner';
import { setAddresses } from '@/lib/data/cart';
import compareAddresses from '@/lib/helpers/compare-addresses';

export const CartAddressSection = ({
  cart,
  customer
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isAddress = Boolean(
    cart?.shipping_address &&
    cart?.shipping_address.first_name &&
    cart?.shipping_address.last_name &&
    cart?.shipping_address.address_1 &&
    cart?.shipping_address.city &&
    cart?.shipping_address.postal_code &&
    cart?.shipping_address.country_code
  );
  const isOpen = searchParams.get('step') === 'address' || !isAddress;

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const [message, formAction] = useActionState(setAddresses, sameAsBilling);

  useEffect(() => {
    if (!isAddress) {
      router.replace(pathname + '?step=address');
    }
  }, [isAddress]);

  const handleEdit = () => {
    router.replace(pathname + '?step=address');
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
        {!isOpen && isAddress && (
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
      <form
        action={async data => {
          await formAction(data);
          router.replace(`${pathname}?step=delivery`);
          router.refresh();
        }}
      >
        {isOpen ? (
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />
            <Button
              className="float-right mt-6 bg-brand text-white hover:bg-brand_grey hover:text-black"
              data-testid="submit-address-button"
              variant="tonal"
            >
              Continue to Delivery
            </Button>
            <ErrorMessage
              error={message !== 'success' && message}
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
        {isAddress && !searchParams.get('step') && (
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
