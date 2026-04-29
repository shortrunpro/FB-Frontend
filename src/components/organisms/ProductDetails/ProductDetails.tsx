import {
  ProductDetailsFooter,
  ProductDetailsHeader,
  ProductDetailsShipping,
  ProductPageDetails
} from '@/components/cells';
import { ProductWithFiles } from '@/types/product';

export const ProductDetails = async ({ product }: { product: ProductWithFiles }) => {
  return (
    <div>
      <ProductDetailsHeader product={product} />
      <ProductPageDetails details={product?.description || ''} />
      <ProductDetailsShipping />
      <ProductDetailsFooter
        tags={product?.tags || []}
        posted={product?.created_at}
      />
    </div>
  );
};
