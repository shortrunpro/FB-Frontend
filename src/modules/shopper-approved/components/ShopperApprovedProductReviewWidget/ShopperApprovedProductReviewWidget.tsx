'use client';

import { useEffect } from 'react';

export const ShopperApprovedProductReviewWidget = ({ sku }: { sku: string | null }) => {
  useEffect(() => {
    const script = document.createElement('script');
    if (sku) {
      const sa_id = process.env.NEXT_PUBLIC_SA_ID;
      script.src = `https://www.shopperapproved.com/widgets/${sa_id}/product/${sku}/product-widget/default.js`;
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      document.body.removeChild(script);
    };
  }, [sku]);

  return (
    <div
      className=""
      data-testid="sa-product-review-widget"
    />
  );
};
