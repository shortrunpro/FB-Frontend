import { ProductVariants } from '@/components/molecules';
import { ProductBulletPoints, ProductFiles } from '@/components/organisms';
import { getProductPrice } from '@/lib/helpers/get-product-price';
import { ProductWithFiles } from '@/types/product';

export const ProductDetailsHeader = ({ product }: { product: ProductWithFiles }) => {
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
      </div>
    </div>
  );
};
