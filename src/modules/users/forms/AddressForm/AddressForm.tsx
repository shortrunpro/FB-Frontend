'use client';

import { FC, useState } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpTypes } from '@medusajs/types';
import { FieldValues, FormProvider, useForm, useFormContext } from 'react-hook-form';

import { addCustomerAddress, updateCustomerAddress } from '@/lib/data/customer';
import {
  Button,
  CountrySelect,
  ErrorMessage as Error,
  LabeledInput,
  StateSelect,
  TurnstileController
} from '@/modules/common/components';

import { AddressFormData, addressSchema } from './schema';

interface Props {
  defaultValues?: AddressFormData;
  regions: HttpTypes.StoreRegion[];
  handleClose?: () => void;
}

export const emptyDefaultAddressValues = {
  addressName: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  countryCode: '',
  postalCode: '',
  company: '',
  province: '',
  phone: '',
  turnstileToken: '',
  metadata: {}
};

export const AddressForm: FC<Props> = ({ defaultValues, ...props }) => {
  const methods = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || emptyDefaultAddressValues
  });

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
};
const Form: FC<Props> = ({ regions, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useFormContext();

  const handleCountryChange = (e: any) => {
    clearErrors('countryCode');
    setValue('countryCode', e.target.value);
    setValue('province', '');
  };
  const region = {
    countries: regions.flatMap(region => region.countries)
  };

  const submit = async (data: FieldValues) => {
    setLoading(true);
    clearErrors('global');
    const formData = new FormData();
    formData.append('addressId', data.addressId || '');
    formData.append('address_name', data.addressName);
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('address_1', data.address);
    formData.append('address_2', '');
    formData.append('province', data.province);
    formData.append('city', data.city);
    formData.append('country_code', data.countryCode);
    formData.append('postal_code', data.postalCode);
    formData.append('company', data.company);
    formData.append('phone', data.phone);
    formData.append('turnstileToken', data.turnstileToken);
    const res = data.addressId
      ? await updateCustomerAddress(formData)
      : await addCustomerAddress(formData);
    if (!res.success) {
      setError('global', { message: res.error });
      setLoading(false);
      return;
    }
    handleClose && handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      data-testid="address-form"
    >
      <div className="space-y-4 px-4">
        <div className="items-top mb-4 grid max-w-full grid-cols-2 gap-4">
          <LabeledInput
            label="Address name"
            placeholder="Type address name"
            className="col-span-2"
            error={errors}
            data-testid="address-form-address-name-input"
            {...register('addressName')}
          />
          <LabeledInput
            label="First name*"
            placeholder="Type first name"
            error={errors}
            data-testid="address-form-first-name-input"
            {...register('firstName')}
          />
          <LabeledInput
            label="Last name*"
            placeholder="Type last name"
            error={errors}
            data-testid="address-form-last-name-input"
            {...register('lastName')}
          />
          <LabeledInput
            label="Company (optional)"
            placeholder="Type company"
            error={errors}
            data-testid="address-form-company-input"
            {...register('company')}
          />
          <LabeledInput
            label="Address*"
            placeholder="Type address"
            error={errors}
            data-testid="address-form-address-input"
            {...register('address')}
          />
          <LabeledInput
            label="City*"
            placeholder="Type city"
            error={errors}
            data-testid="address-form-city-input"
            {...register('city')}
          />
          <LabeledInput
            label="Postal code*"
            placeholder="Type postal code"
            error={errors}
            data-testid="address-form-postal-code-input"
            {...register('postalCode')}
          />
          <div>
            <CountrySelect
              region={region as HttpTypes.StoreRegion}
              {...register('countryCode')}
              value={watch('countryCode')}
              defaultValue={''}
              onChange={handleCountryChange}
              className="h-12"
              data-testid="address-form-country-select"
              errors={errors}
            />
          </div>
          <div>
            <StateSelect
              country={watch('countryCode')}
              value={watch('province')}
              {...register('province')}
              errors={errors}
            />
          </div>

          <LabeledInput
            label="Phone*"
            placeholder="Type phone number"
            error={errors}
            data-testid="address-form-phone-input"
            {...register('phone')}
          />
        </div>
        {errors.global && (
          <ErrorMessage
            errors={errors}
            name={'global'}
            render={({ message }) => {
              return <Error error={message} />;
            }}
          />
        )}
        <TurnstileController
          control={control}
          errors={errors}
        />

        <Button
          className="label-lg w-full"
          data-testid="address-form-submit-button"
          variant="brand"
          loading={loading}
        >
          Save address
        </Button>
      </div>
    </form>
  );
};
