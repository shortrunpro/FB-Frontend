import { getProductPrice } from '@/lib/helpers/get-product-price';
import { ProductAddons, ProductFiles, ProductVariants } from '@/modules/products/components';
import { ProductWithFiles } from '@/types/product';

import { ProductBulletPoints } from '../ProductBulletPoints/ProductBulletPoints';

export const ProductDetails = async ({ product }: { product: ProductWithFiles }) => {
  const { cheapestVariant, cheapestPrice } = getProductPrice({
    product
  });

  // Check if product has any valid prices in current region
  const hasAnyPrice = cheapestPrice !== null && cheapestVariant !== null;
  return (
    <div
      className="rounded-sm border p-5"
      data-testid="product-details-header"
    >
      <div className="flex justify-between">
        <div>
          <h1
            className="heading-lg text-primary"
            data-testid="product-title"
          >
            {product.title}
          </h1>
        </div>
      </div>
      {/* Product Variants */}
      {hasAnyPrice && <ProductVariants product={product} />}
      <div className="flex flex-col gap-y-8">
        <ProductBulletPoints />
        <ProductFiles files={product.files} />
        {/* @ts-ignore */}
        {product?.addons && <ProductAddons addons={product?.addons} />}
      </div>
    </div>
  );
};
