import { VariantsSearchResponse } from '../../../../types/variants';
import ProductVariantCard from '../ProductVariantCard/ProductVariantCard';

export const ProductAddons = ({ addons }: { addons: any }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="heading-md">Installation Kits + Product Accessories</h3>
      <div className="grid grid-cols-3 gap-x-4">
        {addons.variants.map((v: any) => (
          <div>
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
