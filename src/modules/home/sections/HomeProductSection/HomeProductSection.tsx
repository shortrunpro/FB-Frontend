import { listProducts } from '@/lib/data/products';
import { HomeProductsCarousel } from '@/modules/products/templates';
import { Product } from '@/types/product';

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'pl',
  products = [],
  home = false
}: {
  heading: string;
  locale?: string;
  products?: Product[];
  home?: boolean;
}) => {
  const { response } = await listProducts({
    countryCode: locale,
    collection_id: process.env.NEXT_PUBLIC_POPULAR_PRODUCTS_COLLECTION_ID,
    queryParams: {
      order: 'created_at'
    },
    forceCache: !home
  });
  return (
    <section className="w-full py-8">
      <h2 className="heading-lg mb-6 font-bold uppercase tracking-tight text-brand">{heading}</h2>
      <div className="hidden lg:block">
        <HomeProductsCarousel
          products={response.products}
          slidesPerView={4}
        />
      </div>
      <div className="lg:hidden">
        <HomeProductsCarousel
          products={response.products}
          slidesPerView={1}
        />
      </div>
    </section>
  );
};
