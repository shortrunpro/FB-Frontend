'use client';

import { useCallback, useEffect, useState } from 'react';

import { CheckCircleSolid, CreditCard } from '@medusajs/icons';
import { Container, Heading, Text } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { paymentInfoMap } from '@/lib/constants';
import { initiatePaymentSession } from '@/lib/data/cart';
import { Button, ErrorMessage } from '@/modules/common/components';

import { cart } from '../../../../data/cartMock';
import { PaymentSectionProps } from '../../types';
import PaymentButton from '../PaymentButton';
import AuthnetForm from './AuthnetForm';
import PaymentContainer from './PaymentContainer';

const PaymentSection = ({ cart, clientKey, apiLoginID }: PaymentSectionProps) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === 'pending'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ''
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'payment';

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
  };

  const paymentReady =
    activeSession && cart?.shipping_methods && cart?.shipping_methods.length !== 0;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEdit = () => {
    router.push(pathname + '?' + createQueryString('step', 'payment'), {
      scroll: false
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const shouldInputCard = !activeSession;

      const checkActiveSession = activeSession?.provider_id === selectedPaymentMethod;

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod
        });
      }

      if (!shouldInputCard) {
        return router.push(pathname + '?' + createQueryString('step', 'review'), {
          scroll: false
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const isEditEnabled = !isOpen && !!cart?.payment_collection?.payment_sessions?.length;
  const previousStepsCompleted =
    cart.shipping_address &&
    cart?.shipping_methods &&
    cart?.shipping_methods.length > 0 &&
    cart?.payment_collection;

  return (
    <>
      <div
        className="bg-ui-bg-interactive rounded-sm border p-4"
        data-testid="checkout-step-payment"
      >
        <div className="mb-6 flex flex-row items-center justify-between">
          <Heading
            level="h2"
            className="text-3xl-regular flex flex-row items-center gap-x-2"
          >
            {!isOpen && paymentReady && <CheckCircleSolid />}
            Payment
          </Heading>
          {isEditEnabled && (
            <Text>
              <Button
                data-testid="checkout-payment-edit-button"
                onClick={handleEdit}
                variant="tonal"
              >
                Edit
              </Button>
            </Text>
          )}
        </div>
        <div>
          <div className={isOpen ? 'block' : 'hidden'}>
            <AuthnetForm
              cart={cart}
              apiLoginID={apiLoginID}
              clientKey={clientKey}
            />

            <ErrorMessage
              error={error}
              data-testid="payment-method-error-message"
            />
          </div>

          <div className={isOpen ? 'hidden' : 'block'}>
            {cart && paymentReady && activeSession ? (
              <div className="flex w-full items-start gap-x-1">
                {/* <span>For security reasons card information </span> */}
                {/* <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">Payment method</Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">Payment details</Text>
                <div
                  className="txt-medium text-ui-fg-subtle flex items-center gap-2"
                  data-testid="payment-details-summary"
                >
                  <Container
                    className="bg-ui-button-neutral-hover flex h-7 w-fit items-center p-2"
                    data-testid="payment-details-summary"
                  >
                    {paymentInfoMap[selectedPaymentMethod]?.icon || <CreditCard />}
                  </Container>
                  <Text>{cardBrand ? cardBrand : 'Another step will appear'}</Text>
                </div>
              </div> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {!isOpen && previousStepsCompleted && (
        <PaymentButton
          cart={cart}
          data-testid="submit-order-button"
        />
      )}
    </>
  );
};

export default PaymentSection;
