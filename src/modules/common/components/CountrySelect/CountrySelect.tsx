'use client';

import { forwardRef, Fragment, useImperativeHandle, useMemo, useRef } from 'react';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react';
import { ErrorMessage as Error } from '@hookform/error-message';
import { ChevronUpDown } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { clx } from '@medusajs/ui';
import clsx from 'clsx';
import { FieldErrors, FieldValues } from 'react-hook-form';

import NativeSelect, { NativeSelectProps } from '@/components/molecules/NativeSelect/NativeSelect';

import ErrorMessage from '../ErrorMessage';

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion;
  }
>(({ placeholder = 'Country', region, defaultValue, errors, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);
  const error = errors as FieldErrors<FieldValues>;
  const name = props?.name as string;

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map(country => ({
      value: country.iso_2,
      label: country.display_name
    }));
  }, [region]);

  const handleSelect = (value: string) => {
    props.onChange?.({
      target: {
        name: props.name,
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <label className="label-md-medium">
      <p className="">Country*</p>

      <Listbox
        onChange={handleSelect}
        // @ts-ignore
        value={props.value}
      >
        <div className="relative">
          <ListboxButton
            className={clsx(
              'text-base-regular relative flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border bg-component-secondary px-4 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300',
              error[name] && 'border-negative focus:border-negative'
            )}
            data-testid="shipping-address-select"
          >
            {({ open }) => (
              <>
                <span className="block truncate">
                  {countryOptions?.find(country => country.value === props.value)?.label ||
                    'Choose a country'}
                </span>
                <ChevronUpDown
                  className={clx('transition-rotate duration-200', {
                    'rotate-180 transform': open
                  })}
                />
              </>
            )}
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="text-small-regular border-top-0 absolute z-20 max-h-60 w-full overflow-auto rounded-lg border bg-white focus:outline-none sm:text-sm"
              data-testid="shipping-address-options"
            >
              {countryOptions?.map(({ value, label }, index) => (
                <ListboxOption
                  key={index}
                  value={value}
                  className="relative cursor-pointer select-none border-b py-4 pl-6 pr-10 hover:bg-gray-50"
                  data-testid="shipping-address-option"
                >
                  {label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      <div className="hidden">
        <NativeSelect
          ref={innerRef}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={clsx('hidden h-12 w-full items-center bg-component-secondary')}
          {...props}
        >
          {countryOptions?.map(({ value, label }, index) => (
            <option
              key={index}
              value={value}
            >
              {label}
            </option>
          ))}
        </NativeSelect>
      </div>
      {errors && props.name && error[props.name] && (
        <Error
          errors={errors}
          name={props.name}
          render={({ message }) => {
            return <ErrorMessage error={message} />;
          }}
        />
      )}
    </label>
  );
});

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;
