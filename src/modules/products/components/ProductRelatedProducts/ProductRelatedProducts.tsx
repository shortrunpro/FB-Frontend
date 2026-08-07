import { Carousel } from '@/modules/common/components';
import { RelatedProduct } from '@/types/product';

import { ProductCard } from '../ProductCard/ProductCard';

export const ProductRelatedProducts = ({ products }: { products: RelatedProduct }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-lg">Related Products</h3>
      <div className="">
        {products.products.length > 0 && <Carousel slides={products.products} />}
      </div>
    </div>
  );
};
