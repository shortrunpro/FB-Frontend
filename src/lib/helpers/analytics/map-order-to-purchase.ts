import { HttpTypes } from '@medusajs/types';

import { EcommerceItem } from '@/hooks/useEcommerceTracking';

export interface Ga4PurchasePayload {
  transactionId: string;
  items: EcommerceItem[];
  value: number;
  currency: string;
  tax: number;
  shipping: number;
}

export function mapOrderToGa4Purchase(order: HttpTypes.StoreOrder): Ga4PurchasePayload {
  const items: EcommerceItem[] = (order.items ?? []).map(item => ({
    item_id: item.variant?.sku ?? item.variant_id ?? item.id,
    item_name: [item.subtitle, item.title].filter(Boolean).join(' ').trim() || 'Unknown item',
    price: item.unit_price ?? 0,
    quantity: item.quantity ?? 1,
    item_brand: item.product?.metadata?.brand as string | undefined,
    item_category: item.product?.collection?.title as string | undefined,
    variant: item.variant?.title ?? undefined
  }));

  return {
    // GA4 deduplicates on transaction_id — use stable order.id, not display_id
    transactionId: order.id,
    items,
    value: order.total ?? 0,
    currency: (order.currency_code ?? 'USD').toUpperCase(),
    tax: order.tax_total ?? 0,
    shipping: order.shipping_total ?? 0
  };
}
