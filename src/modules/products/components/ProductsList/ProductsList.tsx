import { HttpTypes } from '@medusajs/types';

import { ProductCard } from '@/modules/products/components';

export const ProductsList = ({ products }: { products: HttpTypes.StoreProduct[] }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
};
