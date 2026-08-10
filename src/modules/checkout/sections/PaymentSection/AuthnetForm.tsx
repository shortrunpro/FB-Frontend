import { useRef, useState } from 'react';

import { Text } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AuthNetEnvironment, useAcceptJs } from 'react-acceptjs';

import { initiatePaymentSession } from '@/lib/data/cart';
import { formatCardNumber, formatCVV, formatExpiry } from '@/lib/helpers/payment-utils';
import { Button, Spinner } from '@/modules/common/components';

import { BasicCardInfo, PaymentSectionProps } from '../../types';

const AuthnetForm = ({ apiLoginID, clientKey, cart }: PaymentSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const authData = {
    apiLoginID,
    clientKey
  };
  // Environment logic for authnet, checks env variable for declared environment with fallback to production
  const environment: AuthNetEnvironment =
    (process.env.NEXT_PUBLIC_AUTHNET_ENVIRONMENT as AuthNetEnvironment | null) ?? 'PRODUCTION';
  const { dispatchData, loading, error } = useAcceptJs({ environment, authData });
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState<BasicCardInfo>({
    cardNumber: '',
    month: '',
    year: '',
    cardCode: ''
  });
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const provider = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER_ID ?? '';
      const checkActiveSession = cart?.payment_collection;
      const response = await dispatchData({
        cardData: { ...card, cardNumber: card.cardNumber.replace(/\s/g, '') }
      });
      const { billing_address, shipping_address, email, customer_id } = cart;
      // if (!checkActiveSession && response?.messages?.resultCode === 'Ok') {
      await initiatePaymentSession(cart, {
        provider_id: provider,
        data: {
          dataValue: response?.opaqueData?.dataValue,
          // @ts-ignore
          customer: cart?.customer,
          email,
          billing_address,
          shipping_address
        }
      });
      router.push(pathname + '?step=review', { scroll: false });
      router.refresh();
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCard = (e: any) => {
    // e.target.value = formatCardNumber(e.target.value);
    setCard({ ...card, cardNumber: e?.target.value });
    if (e.target.value.length === 19) {
      monthRef?.current?.focus();
    }
  };
  const handleMonth = (e: any) => {
    e.target.value = formatExpiry(e.target.value);
    setCard({ ...card, month: e?.target.value });
    if (e.target.value.length === 2) {
      yearRef?.current?.focus();
    }
  };
  const handleYear = (e: any) => {
    e.target.value = formatExpiry(e.target.value);
    setCard({ ...card, year: e?.target.value });
    if (e.target.value.length === 2) {
      cvvRef?.current?.focus();
    }
  };
  const handleCvv = (e: any) => {
    e.target.value = formatCVV(e.target.value);
    setCard({ ...card, cardCode: e.target.value });
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="my-4">
      <Text className="txt-medium-plus text-ui-fg-base mb-1">Enter your card details:</Text>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="flex h-16 w-full items-center gap-2 overflow-hidden rounded-sm border border-solid border-gray-300 bg-white p-2 text-base text-brand shadow hover:border-gray-600 hover:shadow-md">
          <input
            onInput={handleCard}
            value={formatCardNumber(card.cardNumber)}
            className="w-full flex-1 border-0 bg-transparent py-1 outline-none autofill:bg-transparent"
            placeholder="Card Number"
            maxLength={19}
            autoComplete="cc-number"
          />
          <span className="mx-1">|</span>
          <div className="flex min-w-[100px] items-center gap-1">
            <input
              value={card.month}
              className="w-10 bg-transparent py-1 text-center outline-none"
              placeholder="MM"
              maxLength={2}
              autoComplete="cc-exp-month"
              ref={monthRef}
              onInput={handleMonth}
            />
            <span className="mx-1">/</span>
            <input
              value={card.year}
              className="w-10 bg-transparent py-1 text-center outline-none"
              placeholder="YY"
              maxLength={2}
              autoComplete="cc-exp-year"
              ref={yearRef}
              onInput={handleYear}
            />
          </div>
          <span className="mx-1">|</span>
          <input
            className="w-16 bg-transparent py-1 text-center outline-none"
            value={card.cardCode}
            type="password"
            placeholder="CVV"
            maxLength={4}
            autoComplete="cc-csc"
            ref={cvvRef}
            onInput={handleCvv}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className={`bg-brand text-white hover:bg-brand_grey hover:text-black ${isLoading && 'flex min-w-[179px] justify-center'}`}
            onClick={handleSubmit}
            variant="tonal"
            loading={loading || isLoading}
            disabled={loading || isLoading}
          >
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthnetForm;
