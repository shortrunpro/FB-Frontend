'use client';

import React from 'react';

import { convertToLocale } from '@/lib/helpers/money';

type CartTotalsProps = {
  totals: {
    item_total?: number | null;
    total?: number | null;
    shipping_total?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    shipping_subtotal?: number | null;
  };
};

const OrderTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const { item_total, currency_code, total, gift_card_total, shipping_total } = totals;

  return (
    <div className="rounded-sm border bg-white p-4">
      <div className="txt-medium text-ui-fg-subtle flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">Items</span>
          <span
            data-testid="cart-subtotal"
            data-value={item_total || 0}
            className="label-lg-medium"
          >
            ${item_total?.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery</span>
          <span
            data-testid="cart-shipping"
            data-value={shipping_total || 0}
            className="label-lg-medium"
          >
            ${shipping_total?.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="text-ui-fg-base txt-medium mb-2 flex items-center justify-between">
        <span>Total</span>
        <span
          className="label-lg-medium"
          data-testid="cart-total"
          data-value={total || 0}
        >
          ${total?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderTotals;
