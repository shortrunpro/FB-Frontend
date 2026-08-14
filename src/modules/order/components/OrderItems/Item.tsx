import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';

export const Item = ({
  item
}: {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
}) => {
  return (
    <div className="flex w-full max-w-full gap-4 rounded-sm border px-4">
      <div>
        <div
          data-testid="order-item-image-container"
          className="flex h-[132px] w-[100px] items-center justify-center"
        >
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt="Product thumbnail"
              width={100}
              height={132}
              className="h-[132px] w-[100px] rounded-xs object-contain"
            />
          ) : (
            <Image
              src={'/images/placeholder.svg'}
              alt="Product thumbnail"
              width={50}
              height={66}
              className="h-[66px] w-[50px] rounded-xs object-contain opacity-30"
            />
          )}
        </div>
      </div>

      <div className="flex w-full max-w-full flex-col truncate p-2">
        <div className="flex max-w-full justify-between truncate lg:mb-4">
          <div className="mb-6 w-full truncate">
            <h3 className="heading-xs truncate uppercase">{item.title}</h3>
            <h4 className="label-md-medium">SKU: {item.variant_sku}</h4>
          </div>
        </div>
        <div className="-mt-4 flex items-center justify-between lg:mt-0">
          <div className="label-md text-secondary">
            <p>
              Quantity: <span className="text-primary">{item.quantity}</span>
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:block lg:text-right">
            {item?.total !== item?.original_total && (
              <p className="label-md text-secondary line-through">${item?.original_total}</p>
            )}
            <p className="label-lg-medium">${item?.total?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
