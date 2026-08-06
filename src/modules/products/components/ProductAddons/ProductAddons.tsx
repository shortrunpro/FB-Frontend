import { ProductAddon } from '@/types/product';

import { VariantsSearchResponse } from '../../../../types/variants';
import ProductVariantCard from '../ProductVariantCard/ProductVariantCard';

export const ProductAddons = ({ addons }: { addons: ProductAddon }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="heading-md">Installation Kits + Product Accessories</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {addons.variants.map((v: any) => (
          <div
            key={`addon-${v.id}`}
            className="flex max-w-[350px] lg:max-w-[300px]"
          >
            <ProductVariantCard
              variant={
                {
                  ...v,
                  calculated_price: v?.prices[0]?.amount,
                  handle: `${v?.product?.handle}?sku=${v.sku}`
                } as VariantsSearchResponse
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
