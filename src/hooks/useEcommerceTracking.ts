import { sendGTMEvent } from '@next/third-parties/google';

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
  const trackAddToCart = (item: EcommerceItem) => {
    sendGTMEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: item.price * item.quantity,
        items: [item]
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

  // 4. Purchase (Success Page)
  const trackPurchase = (
    transactionId: string,
    items: EcommerceItem[],
    totalValue: number,
    tax = 0,
    shipping = 0
  ) => {
    sendGTMEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionId,
        currency: 'USD',
        value: totalValue,
        tax: tax,
        shipping: shipping,
        items: items
      }
    });
  };

  return { trackViewItem, trackAddToCart, trackBeginCheckout, trackPurchase };
};
