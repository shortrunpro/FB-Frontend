import { RelatedProduct } from '@/types/product';

import { ProductCard } from '../ProductCard/ProductCard';

export const ProductRelatedProducts = ({ products }: { products: RelatedProduct }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-lg">Related Products</h3>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {products.products.length > 0 &&
          products.products.map(product => (
            <ProductCard
              key={`rel-${product.id}`}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};
