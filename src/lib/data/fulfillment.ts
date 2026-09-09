'use server';

import { HttpTypes } from '@medusajs/types';

import { sdk } from '@/lib/config';
import { StoreCardShippingMethod } from '@/modules/checkout/types';

import { getAuthHeaders, getCacheOptions } from './cookies';

export const listCartShippingMethods = async (
  cart: HttpTypes.StoreCart,
  is_return: boolean = false
) => {
  const weight =
    cart?.items &&
    cart.items?.reduce((sum, item) => {
      const weight = Number(item.variant?.weight || 0);
      const quantity = Number(item.quantity || 1);
      return sum + weight * quantity;
    }, 0);
  if (weight && weight > 150) {
    return [
      {
        id: process.env.NEXT_PUBLIC_FREIGHT_SHIPPING_ID,
        service: 'Freight',
        calculated_amount: 0
      }
    ];
  }
  const headers = {
    ...(await getAuthHeaders())
  };

  const next = {
    ...(await getCacheOptions('fulfillment'))
  };
  return sdk.client
    .fetch<{ shipping_options: StoreCardShippingMethod[] | null }>(
      `/store/carts/${cart.id}/shipping-options`,
      {
        method: 'GET',
        headers,
        next,
        cache: 'force-cache'
      }
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>
) => {
  const headers = {
    ...(await getAuthHeaders())
  };

  const next = {
    ...(await getCacheOptions('fulfillment'))
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: 'POST',
        body,
        headers,
        next
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch(e => {
      return null;
    });
};
