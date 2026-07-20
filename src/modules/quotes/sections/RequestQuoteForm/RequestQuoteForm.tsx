'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { newQuote } from '@/lib/data/quotes';
import { Button, FileUpload, Input, Textarea } from '@/modules/common/components';
import { FileType, RejectedFile } from '@/modules/common/components/FileUpload/FileUpload';

import { RequestQuoteSchema, schema } from '../../schema/schema';

const RequestQuoteForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue
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
  const handleFile = (files: FileType[], rejectedFiles?: RejectedFile[]) => {
    const fileMap = files.map(file => file.file);
    setValue('files', fileMap);
    return;
  };
  const onSubmit = async (formData: RequestQuoteSchema) => {
    setLoading(true);
    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'files' && formData.files?.length) {
        Array.from(formData.files).map((file: File) => {
          payload.append('files', file);
        });
      } else {
        const val = formData[key as keyof RequestQuoteSchema];
        if (val !== null && val !== undefined) {
          payload.append(key, String(val));
        }
      }
    });
    try {
      const { ok } = await newQuote(payload);
      if (ok) {
        reset();
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-4 gap-y-6"
      >
        <Input
          className="input-block border-grey-2 input rounded border"
          type="text"
          label="First Name *"
          {...register('first_name')}
          data-testid="first_name-input"
          error={errors}
        />
        <Input
          className="input-block border-grey-2 input rounded border"
          type="text"
          label="Last Name *"
          {...register('last_name')}
          data-testid="last_name-input"
          error={errors}
        />
        <Input
          className="input-block border-grey-2 input rounded border"
          type="email"
          label="Email Address *"
          title="Enter a valid email address."
          {...register('email')}
          data-testid="email-input"
          error={errors}
        />
        <Input
          className="input-block border-grey-2 input rounded border"
          type="text"
          label="Phone *"
          {...register('phone')}
          data-testid="phone-input"
          error={errors}
        />
        <Input
          className="input-block border-grey-2 input rounded border"
          type="text"
          label="Company"
          {...register('company')}
          data-testid="company-input"
          error={errors}
        />
        <Input
          className="input-block border-grey-2 input rounded border"
          type="number"
          label="Quantity *"
          min={1}
          {...register('quantity')}
          data-testid="quantity-input"
          error={errors}
        />
        <div className="col-span-2 flex flex-col gap-y-4 sm:col-span-1">
          <Input
            className="input-block border-grey-2 input rounded border"
            type="text"
            label="Material *"
            {...register('material')}
            data-testid="material-input"
            error={errors}
          />

          <div className="h-50">
            <FileUpload
              label="Drag and drop images, or click to browse"
              formats={['.pdf', '.jpg', '.jpeg', '.png']}
              onUploaded={handleFile}
            />
          </div>
        </div>
        <div className="col-span-2 h-full sm:col-span-1">
          <Textarea
            rows={4}
            label="Project Details *"
            {...register('product_detail')}
            data-testid="project-details-textarea"
            error={errors}
          />
        </div>
        <div className="col-start-2 flex w-full justify-end">
          <Button
            className="text-md w-1/2 bg-brand"
            data-testid="submit-rfq-button"
            disabled={isSubmitting || loading}
            loading={isSubmitting || loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestQuoteForm;
