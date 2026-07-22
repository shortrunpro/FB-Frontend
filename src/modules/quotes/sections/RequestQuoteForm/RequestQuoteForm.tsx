'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { newQuote } from '@/lib/data/quotes';
import { Button, FileUpload, Input, SuccessBanner, Textarea } from '@/modules/common/components';
import { FileType, RejectedFile } from '@/modules/common/components/FileUpload/FileUpload';

import { RequestQuoteSchema, schema } from '../../schema/schema';

const RequestQuoteForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setError
  } = useForm<RequestQuoteSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: null,
      customer_id: null,
      quote_type: 'RFQ',
      product_sku: null,
      files: null
    }
  });
  const file = watch('files');
  const handleFile = (files: FileType[], rejectedFiles?: RejectedFile[]) => {
    if (rejectedFiles?.length) {
      return rejectedFiles.forEach(f => {
        setError('files', { message: `${f.file.name} was rejected due to ${f.reason}` });
        setValue('files', null);
      });
    } else {
      setError('files', {});
    }
    const fileMap = files.map(file => file.file);
    setValue('files', fileMap);
    return;
  };
  const onSubmit = async (formData: RequestQuoteSchema) => {
    setLoading(true);
    const { ok, error } = await newQuote({ formData });
    if (ok) {
      setTimeout(() => {
        router.replace(`${pathname}?success=true`);
        reset();
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(file);
    if (success) {
      setIsSubmitted(true);
      setLoading(false);
    }
  }, [success]);
  return (
    <div className={`transition-all duration-1000 ease-in-out`}>
      {isSubmitted ? (
        <div
          className={`flex animate-fade-in-up flex-col gap-y-2 ${isSubmitted && 'translate-y-0 opacity-100'}`}
        >
          <SuccessBanner message="Awesome! Your RFQ has been received by our Estimation HQ and will be reviewed" />
          <div className="flex flex-col gap-y-6">
            <p>
              If there is any information or clarification we need, so that we will know exactly
              what you want, we will contact you. If everything is good to go, we will get started
              pricing out your requirement.
            </p>
            <p>
              We should be back to you within the next 24 to 48 hours with a quote. So exciting! Let
              us know if there is anything we can help you with during the process.
            </p>
            <p>Your Customer Service Team at Federal brace</p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`grid grid-cols-2 gap-x-4 gap-y-6 ${isSubmitted && 'animate-fade-down-out'}`}
        >
          <Input
            type="text"
            label="First Name *"
            {...register('first_name')}
            data-testid="first_name-input"
            errors={errors}
          />
          <Input
            type="text"
            label="Last Name *"
            {...register('last_name')}
            data-testid="last_name-input"
            errors={errors}
          />
          <Input
            type="email"
            label="Email Address *"
            title="Enter a valid email address."
            {...register('email')}
            data-testid="email-input"
            errors={errors}
          />
          <Input
            type="text"
            label="Phone *"
            {...register('phone')}
            data-testid="phone-input"
            errors={errors}
          />
          <Input
            type="text"
            label="Company"
            {...register('company')}
            data-testid="company-input"
            errors={errors}
          />
          <Input
            type="number"
            label="Quantity *"
            min={1}
            {...register('quantity')}
            data-testid="quantity-input"
            errors={errors}
          />
          <div className="col-span-2 flex flex-col gap-y-4 sm:col-span-1">
            <Input
              type="text"
              label="Material *"
              {...register('material')}
              data-testid="material-input"
              errors={errors}
            />

            <div className="h-50">
              <FileUpload
                label="Drag and drop images, or click to browse"
                formats={['.pdf', '.jpg', '.jpeg', '.png']}
                name="files"
                onUploaded={handleFile}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-2 h-full sm:col-span-1">
            <Textarea
              rows={4}
              label="Project Details *"
              placeholder="Job Description (equipment mounted, installation environment, other job specifics)*"
              {...register('product_detail')}
              data-testid="project-details-textarea"
              error={errors}
            />
          </div>
          <div className="col-start-2 flex w-full justify-end">
            <Button
              className="bg-brand"
              data-testid="submit-rfq-button"
              disabled={isSubmitting || loading}
              loading={isSubmitting || loading}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestQuoteForm;
