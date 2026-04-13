import { HomeProductsCarousel } from '@/components/organisms';
import { listProducts } from '@/lib/data/products';
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

      <HomeProductsCarousel
        locale={locale}
        sellerProducts={response.products}
        home={home}
      />
    </section>
  );
};
