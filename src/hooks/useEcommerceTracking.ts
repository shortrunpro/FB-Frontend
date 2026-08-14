import { HttpTypes, StoreCart, StoreCartLineItem } from '@medusajs/types';
import { sendGTMEvent } from '@next/third-parties/google';

import { mapOrderToGa4Purchase } from '@/lib/helpers/analytics/map-order-to-purchase';

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_brand?: string;
  item_category?: string;
  variant?: string;
}

export const useEcommerceTracking = () => {
  // 1. View Item (Product Detail Page Load)
  const trackViewItem = (item: EcommerceItem) => {
    sendGTMEvent({
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: item.price * item.quantity,
        items: [item]
      }
    });
  };

  // 2. Add To Cart
  const trackAddToCart = (items: EcommerceItem[], value: number) => {
    sendGTMEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value,
        items
      }
    });
  };

  // 3. Begin Checkout
  const trackBeginCheckout = (items: EcommerceItem[], totalValue: number) => {
    sendGTMEvent({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value: totalValue,
        items: items
      }
    });
  };
  // 4. Add Shipping Info
  const trackAddShippingInfo = (
    items: EcommerceItem[],
    totalValue: number,
    shippingTier: string
  ) => {
    sendGTMEvent({
      event: 'add_shipping_info',
      ecommerce: {
        currency: 'USD',
        value: totalValue,
        shipping_tier: shippingTier,
        items: items
      }
    });
  };
  // 5. Add Payment Info
  const trackAddPaymentInfo = (items: EcommerceItem[], totalValue: number) => {
    sendGTMEvent({
      event: 'add_payment_info',
      ecommerce: {
        currency: 'USD',
        payment_type: 'Credit Card',
        value: totalValue,
        items: items
      }
    });
  };
  // 6. Purchase (Success Page)
  const trackPurchase = (
    transactionId: string,
    items: EcommerceItem[],
    totalValue: number,
    tax = 0,
    shipping = 0
  ) => {
    sendGTMEvent({ ecommerce: null });
    sendGTMEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionId,
        currency: 'USD',
        value: totalValue,
        tax,
        shipping,
        items
      }
    });
  };
  const trackPurchaseFromOrder = (order: HttpTypes.StoreOrder) => {
    const payload = mapOrderToGa4Purchase(order);
    trackPurchase(
      payload.transactionId,
      payload.items,
      payload.value,
      payload.tax,
      payload.shipping
    );
  };

  const handleMapCartItems = (
    items: StoreCartLineItem[]
  ): { items: EcommerceItem[]; value: number } => {
    const map = items?.map(m => ({
      item_id: m.variant_sku as string,
      item_name: m.title as string,
      price: m.unit_price as number,
      quantity: m.quantity as number,
      item_category: m?.product?.categories ? m?.product?.categories[0]?.name : undefined
    }));
    const value = map.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;
    return { items: map, value };
  };
  return {
    handleMapCartItems,
    trackViewItem,
    trackAddToCart,
    trackBeginCheckout,
    trackAddShippingInfo,
    trackAddPaymentInfo,
    trackPurchase,
    trackPurchaseFromOrder
  };
};
