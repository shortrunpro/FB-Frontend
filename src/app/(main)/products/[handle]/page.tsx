import type { Metadata } from 'next';

import { listProducts } from '@/lib/data/products';
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
  return (
    <main className="container flex flex-col gap-y-12">
      <ProductDetailsPage
        handle={handle}
        locale={locale}
      />
    </main>
  );
}
