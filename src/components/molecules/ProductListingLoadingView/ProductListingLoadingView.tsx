import { PRODUCT_LIMIT } from '@/const';
import { SkeletonProductCard } from '@/modules/products/components';

const ProductListingLoadingView = () => (
  <div
    className="flex flex-wrap gap-4"
    data-testid="product-listing-loading-view"
  >
    {Array.from({ length: PRODUCT_LIMIT }).map((_, idx) => (
      <SkeletonProductCard key={idx} />
    ))}
  </div>
);

export default ProductListingLoadingView;
