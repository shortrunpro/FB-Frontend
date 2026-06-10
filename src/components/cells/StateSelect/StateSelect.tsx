'use client';

import { forwardRef, Fragment, useImperativeHandle, useMemo, useRef } from 'react';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react';
import { ChevronUpDown } from '@medusajs/icons';
import { clx } from '@medusajs/ui';
import clsx from 'clsx';

import NativeSelect, { NativeSelectProps } from '@/components/molecules/NativeSelect/NativeSelect';

import { states } from './states.json';

export const StateSelect = forwardRef<HTMLSelectElement, NativeSelectProps | any>(
  ({ errors, country, register, placeholder = 'State/Province', defaultValue, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    );

    const handleSelect = (value: string) => {
      props.onChange?.({
        target: {
          name: props.name,
          value
        }
      });
    };
    return (
      <label className="label-md">
        <p className="">State/Province</p>
        <Listbox
          onChange={handleSelect}
          value={props.value}
        >
          <div className="relative">
            <ListboxButton
              className={clsx(
                'text-base-regular relative flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border bg-component-secondary px-4 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300'
              )}
              data-testid="shipping-address-state-select"
            >
              {({ open }) => (
                <>
                  <span className="block truncate">
                    {states?.find(state => state.iso_code === props.value)?.name ||
                      'Choose a State'}
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
                data-testid="shipping-address-state-options"
              >
                {states
                  ?.filter(state => state.country === country)
                  .map(({ iso_code, name }, index) => (
                    <ListboxOption
                      key={index}
                      value={iso_code}
                      className="relative cursor-pointer select-none border-b py-4 pl-6 pr-10 hover:bg-gray-50"
                      data-testid="shipping-address-option"
                    >
                      {name}
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
            value={props?.value}
            {...props}
          >
            {states
              .filter(state => state.country == country)
              .map(({ iso_code, name }, index) => {
                return (
                  <option
                    key={index}
                    value={iso_code}
                  >
                    {name}
                  </option>
                );
              })}
          </NativeSelect>
          {/* {errors?.[name] && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )} */}
        </div>
      </label>
    );
  }
);
