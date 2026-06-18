'use client';

import { useEffect, useState, useTransition, type FC } from 'react';

import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleSolid } from '@medusajs/icons';
import { Heading, Text } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { setShippingMethod } from '@/lib/data/cart';
import { convertToLocale } from '@/lib/helpers/money';
import { ShippingMethodsSectionProps } from '@/modules/checkout/types';
import { Button, ErrorMessage } from '@/modules/common/components';

const ShippingMethodsSection: FC<ShippingMethodsSectionProps> = ({
  cart,
  availableShippingMethods
}) => {
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPendingDeleteRow, startTransitionDeleteRow] = useTransition();
  const [selectedMethod, setSelectedMethod] = useState(cart?.shipping_methods?.[0]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'delivery';

  const handleSubmit = () => {
    setIsLoadingPrices(true);
    router.push(pathname + '?step=payment', { scroll: false });
    router.refresh();
  };

  const handleSetShippingMethod = async (id: string | null) => {
    if (!id) {
      return;
    }

    try {
      setError(null);
      setIsLoadingPrices(true);
      const res = await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: id
      });
      if (!res.ok) {
        return setError(res.error?.message);
      }
      setSelectedMethod({
        ...res.data?.cart?.shipping_methods?.[0],
        name: availableShippingMethods?.find(method => method.id === id)?.service
      });
    } catch (error: any) {
      setError(
        error?.message?.replace('Error setting up the request: ', '') || 'An error occurred'
      );
    } finally {
      setIsLoadingPrices(false);
    }
  };

  useEffect(() => {
    setError(null);
    setIsLoadingPrices(false);
  }, [isOpen]);

  const handleEdit = () => {
    router.replace(pathname + '?step=delivery');
  };
  const isEditEnabled = !isOpen && !!cart?.shipping_methods?.length;
  return (
    <div className="bg-ui-bg-interactive rounded-sm border p-4">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline gap-x-2"
        >
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircleSolid />}
          Delivery
        </Heading>
        {isEditEnabled && (
          <Text>
            <Button
              onClick={handleEdit}
              variant="tonal"
            >
              Edit
            </Button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <>
          <div className="grid">
            <div data-testid="delivery-options-container">
              <div className="pb-8 pt-2 md:pt-0">
                <div className="mb-4">
                  <Heading
                    level="h3"
                    className="mb-2"
                  ></Heading>
                  <RadioGroup
                    // by="name"
                    value={selectedMethod?.shipping_option_id ?? null}
                    onChange={value => handleSetShippingMethod(value)}
                    aria-label="Shipping Options"
                    className="space-y-2"
                  >
                    {availableShippingMethods?.map(method => (
                      <Radio
                        key={method.id}
                        value={method.id}
                        className="focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-black shadow-md transition hover:bg-gray-400 aria-checked:cursor-default aria-checked:bg-brand aria-checked:text-white"
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="text-sm/6">
                            <p className="font-semibold">{method.service}</p>
                            <div className="flex gap-2">
                              <div>${method.calculated_amount.toFixed(2)}</div>
                            </div>
                          </div>
                          <CheckCircleSolid
                            width={20}
                            height={20}
                            className="hidden group-aria-checked:flex"
                          />
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              className={`bg-brand text-white hover:bg-brand_grey hover:text-black ${isLoadingPrices && 'flex min-w-[192px] justify-center'}`}
              onClick={handleSubmit}
              variant="tonal"
              disabled={!cart.shipping_methods?.[0] || isPendingDeleteRow}
              loading={isLoadingPrices}
            >
              Continue to payment
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col">
                {cart.shipping_methods?.map(method => (
                  <div
                    key={method.id}
                    className="mb-4 rounded-md border p-4"
                  >
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">Method</Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {method.name}{' '}
                      {convertToLocale({
                        amount: method.amount!,
                        currency_code: cart?.currency_code
                      })}
                    </Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingMethodsSection;
