import { fetchProductByHandle, listProducts } from '@/lib/data/products';

import {
  ProductDetails,
  ProductGallery,
  ProductPageDetails,
  ProductRelatedProducts
} from '../../components';

export const ProductDetailsPage = async ({ handle }: { handle: string }) => {
  const prod = await fetchProductByHandle({ handle }).then(resp => resp[0]);
  if (!prod) return null;
  return (
    <>
      <div
        className="flex h-auto flex-col justify-center lg:flex-row"
        data-testid="product-details-page"
      >
        <div
          className="lg:w-2/5 lg:px-10"
          data-testid="product-gallery-container"
        >
          <ProductGallery images={prod?.images || []} />
        </div>
        <div
          className="lg:w-1/2 lg:px-2"
          data-testid="product-details-container"
        >
          <ProductDetails product={prod} />
        </div>
      </div>
      <div className="my-8">
        <ProductPageDetails details={prod} />
        {prod?.related_product && <ProductRelatedProducts products={prod?.related_product} />}
      </div>
    </>
  );
};
