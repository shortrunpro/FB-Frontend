'use client';

import { useEffect, useRef } from 'react';

import { HttpTypes } from '@medusajs/types';

import { useEcommerceTracking } from '@/hooks/useEcommerceTracking';

const STORAGE_KEY_PREFIX = 'ga4_purchase_tracked_';

interface OrderPurchaseTrackerProps {
  order: HttpTypes.StoreOrder;
}

export function OrderPurchaseTracker({ order }: OrderPurchaseTrackerProps) {
  const { trackPurchaseFromOrder } = useEcommerceTracking();
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!order?.id || hasFiredRef.current) return;

    const storageKey = `${STORAGE_KEY_PREFIX}${order.id}`;

    // Prevent duplicate on page refresh / back-navigation
    if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey)) {
      return;
    }

    trackPurchaseFromOrder(order);

    hasFiredRef.current = true;
    sessionStorage.setItem(storageKey, '1');
  }, [order, trackPurchaseFromOrder]);

  return null; // renderless tracker
}
