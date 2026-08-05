'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import { StepProgressBar } from '@/components/cells/StepProgressBar/StepProgressBar';
import { ArrowLeftIcon } from '@/icons';
import { createReturnRequest } from '@/lib/data/orders';
import { UserNavigation } from '@/modules/users/components';

import { ReturnItemsTab } from './ReturnItemsTab';
import { ReturnMethodsTab } from './ReturnMethodsTab';
import { ReturnSummaryTab } from './ReturnSummaryTab';

export const OrderReturnSection = ({
  order,
  returnReasons,
  shippingMethods
}: {
  order: any;
  returnReasons: any[];
  shippingMethods: any[];
}) => {
  const [tab, setTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [returnMethod, setReturnMethod] = useState<any>(null);
  const router = useRouter();

  const handleTabChange = (tab: number) => {
    const noReason = selectedItems.filter(item => !item.reason_id);
    if (!noReason.length) {
      setTab(tab);
    } else {
      setError(true);
    }
  };

  const handleSetReturnMethod = (method: any) => {
    setReturnMethod(method);
  };

  const handleSelectItem = (item: any, reason_id: string = '') => {
    setError(false);
    if (!reason_id && selectedItems.some(i => i.line_item_id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.line_item_id !== item.id));
    } else {
      const itemToChange = selectedItems.find(i => i.line_item_id === item.id);
      if (itemToChange) {
        setSelectedItems(
          selectedItems.map(i => (i.line_item_id === item.id ? { ...i, reason_id } : i))
        );
      } else {
        setSelectedItems([
          ...selectedItems,
          { line_item_id: item.id, quantity: item.quantity, reason_id }
        ]);
      }
    }
  };

  const handleSubmit = async () => {
    const data = {
      order_id: order.id,
      customer_note: '',
      shipping_option_id: returnMethod,
      line_items: selectedItems
    };

    const { order_return_request } = await createReturnRequest(data);

    if (!order_return_request.id) {
      return console.log('Error creating return request');
    }

    router.push(`/user/orders/${order_return_request.id}/request-success`);
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
      <UserNavigation />
      <div className="mb-8 md:col-span-3 md:mb-0">
        {tab === 0 ? (
          <Link href={`/user/orders/${order.order_set.id}`}>
            <Button
              variant="tonal"
              className="label-md flex items-center gap-2 uppercase text-action-on-secondary"
            >
              <ArrowLeftIcon className="size-4" />
              Order details
            </Button>
          </Link>
        ) : (
          <Button
            variant="tonal"
            className="label-md flex items-center gap-2 uppercase text-action-on-secondary"
            onClick={() => setTab(0)}
          >
            <ArrowLeftIcon className="size-4" />
            Select items
          </Button>
        )}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-8">
          <div className="col-span-4">
            <div className="mb-4">
              <StepProgressBar
                steps={['SELECT ITEMS TO RETURN', 'SELECT RETURN METHOD']}
                currentStep={tab}
              />
            </div>
            {tab === 0 && (
              <ReturnItemsTab
                order={order}
                selectedItems={selectedItems}
                handleSelectItem={handleSelectItem}
                returnReasons={returnReasons}
                error={error}
              />
            )}
            {tab === 1 && (
              <ReturnMethodsTab
                shippingMethods={shippingMethods}
                handleSetReturnMethod={handleSetReturnMethod}
                returnMethod={returnMethod}
                seller={order.seller}
              />
            )}
          </div>
          <div />
          <div className="col-span-4 md:col-span-3">
            <ReturnSummaryTab
              currency_code={order.currency_code}
              selectedItems={selectedItems}
              items={order.items}
              handleTabChange={handleTabChange}
              tab={tab}
              returnMethod={returnMethod}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
