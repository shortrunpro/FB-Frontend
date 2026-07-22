'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { sendContactRequest } from '@/lib/data/contact-us';
import { Button, Input, Textarea, TextLink } from '@/modules/common/components';

import { ContactUsFormSuccess } from '../ContactUsFormSuccess/ContactUsFormSuccess';
import { ContactUsSchema, schema } from './schema';

export const ContactUsForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ContactUsSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: null
    }
  });
  const onSubmit = (formData: ContactUsSchema) => {
    startTransition(async () => {
      setLoading(true);
      setTimeout(async () => {
        const { type, message } = await sendContactRequest(formData);
        if (type !== 'success' && message) {
          setRequestError(message);
          setLoading(false);
          return;
        }
        router.replace(`${pathname}?success=true`);
        reset();
        setIsSubmitted(true);
        setLoading(false);
      }, 1000);
    });
  };
  const success = searchParams.get('success');

  return (
    <div className="flex flex-col justify-center gap-y-4 lg:w-11/12">
      <div>
        <h1 className="heading-md text-brand">Contact Us</h1>
        <p>
          For questions about an order or for more information about our products, please complete
          the form below, or consult our{' '}
          <TextLink href={'/content/frequently-asked-questions'}>FAQ Page</TextLink>
        </p>
      </div>
      <div className={`transition-all duration-1000 ease-in-out`}>
        {success ? (
          <div className={`animate-fade-in-up ${isSubmitted && 'translate-y-0 opacity-100'}`}>
            <ContactUsFormSuccess />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col gap-y-2 ${isSubmitted && 'animate-fade-out -translate-y-2 opacity-0'}`}
          >
            <Input
              label="Subject Heading*"
              {...register('subject')}
              name="subject"
              errors={errors}
            />
            <Input
              label="Company Name"
              {...register('company')}
              errors={errors}
            />
            <Input
              label="Email Address*"
              type="email"
              {...register('email')}
              errors={errors}
            />
            <Textarea
              label="Message*"
              placeholder="How can we help?"
              {...register('message')}
              error={errors}
            />
            <Button
              disabled={isSubmitting || loading || isPending}
              loading={isSubmitting || loading || isPending}
              type="submit"
              className="bg-brand"
            >
              Send
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
