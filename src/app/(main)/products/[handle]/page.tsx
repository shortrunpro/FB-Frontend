import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { listProducts } from '@/lib/data/products';
import { generateProductMerchantSchema } from '@/lib/helpers/merchant-data';
import { generateProductMetadata } from '@/lib/helpers/seo';
import { ProductDetailsPage } from '@/modules/products/templates';

export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string; locale: string }>;
}): Promise<Metadata> {
  const { handle, locale } = await params;

  const {
    response: { products, count }
  } = await listProducts({
    countryCode: locale,
    queryParams: { handle: [handle], limit: 1 },
    forceCache: true
  });
  if (count == 0) {
    return {};
  }
  return generateProductMetadata(products[0]);
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle, locale } = await params;
  const {
    response: { products: jsonLdProducts, count }
  } = await listProducts({
    countryCode: 'us',
    queryParams: {
      handle: [handle],
      limit: 1,
      fields:
        'id,title,handle,description,images.url,categories.name,categories.handle,variants.sku,variants.thumbnail,variants.title,variants.options.value,variants.options.option.title,variants.calculated_price.calculated_amount'
    }
  });
  if (count == 0) {
    return notFound();
  }
  const jsonLd = generateProductMerchantSchema(jsonLdProducts[0]);
  return (
    <main className="container flex flex-col gap-y-12">
      <Script
        id="ld-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd
        }}
      />
      <ProductDetailsPage
        handle={handle}
        locale={locale}
      />
    </main>
  );
}
