import type { Metadata } from 'next';
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

  const prod = await listProducts({
    countryCode: locale,
    queryParams: { handle: [handle], limit: 1 },
    forceCache: true
  }).then(({ response }) => response.products[0]);

  return generateProductMetadata(prod);
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle, locale } = await params;
  const {
    response: { products: jsonLdProducts }
  } = await listProducts({
    countryCode: 'us',
    queryParams: {
      handle: [handle],
      limit: 1,
      fields:
        'id,title,handle,description,images.url,variants.sku,variants.thumbnail,variants.title,variants.options.value,variants.options.option.title,variants.calculated_price.calculated_amount'
    }
  });
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
