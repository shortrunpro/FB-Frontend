import NotFound from '@/app/not-found';
import { ProductDetailsShipping, ProductPageDetails } from '@/components/cells';
import { ProductDetails, ProductFiles, ProductGallery } from '@/components/organisms';
import { listProducts } from '@/lib/data/products';

import { HomeProductSection } from '../HomeProductSection/HomeProductSection';

export const ProductDetailsPage = async ({
  handle,
  locale
}: {
  handle: string;
  locale: string;
}) => {
  const prod = await listProducts({
    countryCode: locale,
    queryParams: { handle: [handle], limit: 1 },
    forceCache: true
  }).then(({ response }) => response.products[0]);
  if (!prod) return null;

  return (
    <>
      <div
        className="flex h-screen flex-col justify-center md:flex-row"
        data-testid="product-details-page"
      >
        <div
          className="md:w-2/5 md:px-10"
          data-testid="product-gallery-container"
        >
          <ProductGallery images={prod?.images || []} />
        </div>
        <div
          className="md:w-1/2 md:px-2"
          data-testid="product-details-container"
        >
          <ProductDetails product={prod} />
        </div>
      </div>
      <div className="my-8">
        <ProductPageDetails details={prod} />
        <ProductDetailsShipping />
        {/* <HomeProductSection
          heading="More from this seller"
          products={prod.seller?.products}
          // seller_handle={prod.seller?.handle}
          locale={locale}
        /> */}
      </div>
    </>
  );
};
