import { HttpTypes } from '@medusajs/types';

import { ProductCard } from '@/modules/products/components';

interface Props {
  products: HttpTypes.StoreProduct[];
}

const ProductListingProductsView = ({ products }: Props) => (
  <div className="w-full">
    <ul className="flex flex-wrap gap-4">
      {products.map(product => (
        <li
          key={product.id}
          className="w-full min-w-[250px] lg:w-[calc(25%-1rem)]"
        >
          <ProductCard
            product={product}
            className="h-full w-full min-w-0 lg:w-full"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ProductListingProductsView;
