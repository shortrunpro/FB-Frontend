'use client';

import { useEffect } from 'react';

export default function ShopperApprovedReviewsPageWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = process.env.NEXT_PUBLIC_SA_REVIEW_PAGE_URL ?? '';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Customer Reviews</h1>
      <div
        id="SA_review_wrapper"
        role="region"
        aria-label="Customer reviews widget"
      />
    </div>
  );
}
