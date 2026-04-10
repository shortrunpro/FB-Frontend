import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';

import {
  BannerSection,
  BlogSection,
  HomeCategories,
  HomeImageCarousel,
  HomeProductSection,
  HomeSignUp,
  ShopByStyleSection
} from '@/components/sections';
import { listRegions } from '@/lib/data/regions';
import { toHreflang } from '@/lib/helpers/hreflang';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

  // Build alternates based on available regions (locales)
  let languages: Record<string, string> = {};
  try {
    const regions = await listRegions();
    const locales = Array.from(
      new Set(
        (regions || [])
          .map(r => r.countries?.map(c => c.iso_2) || [])
          .flat()
          .filter(Boolean)
      )
    ) as string[];

    languages = locales.reduce<Record<string, string>>((acc, code) => {
      const hrefLang = toHreflang(code);
      acc[hrefLang] = `${baseUrl}/${code}`;
      return acc;
    }, {});
  } catch {
    // Fallback: only current locale
    languages = { [toHreflang(locale)]: `${baseUrl}/${locale}` };
  }

  const title = 'Home';
  const description =
    'Welcome to Mercur B2C Demo! Create a modern marketplace that you own and customize in every aspect with high-performance, fully customizable storefront.';
  const ogImage = '/B2C_Storefront_Open_Graph.png';
  const canonical = `${baseUrl}/${locale}`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1
      }
    },
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': baseUrl
      }
    },
    openGraph: {
      title: `${title} | ${
        process.env.NEXT_PUBLIC_SITE_NAME || 'Mercur B2C Demo - Marketplace Storefront'
      }`,
      description,
      url: canonical,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Mercur B2C Demo - Marketplace Storefront',
      type: 'website',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: process.env.NEXT_PUBLIC_SITE_NAME || 'Mercur B2C Demo - Marketplace Storefront'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`]
    }
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Mercur B2C Demo - Marketplace Storefront';

  return (
    <main className="row-start-2 flex flex-col items-center gap-8 text-primary sm:items-start">
      <link
        rel="preload"
        as="image"
        href="/images/hero/Image.jpg"
        imageSrcSet="/images/hero/Image.jpg 700w"
        imageSizes="(min-width: 1024px) 50vw, 100vw"
      />
      {/* Organization JSON-LD */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteName,
            url: `${baseUrl}/${locale}`,
            logo: `${baseUrl}/favicon.ico`
          })
        }}
      />
      {/* WebSite JSON-LD */}
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteName,
            url: `${baseUrl}/${locale}`,
            inLanguage: toHreflang(locale)
          })
        }}
      />
      <HomeImageCarousel />
      <div className="w-full px-12 lg:px-12">
        <HomeCategories heading="POPULAR CATEGORIES" />
        <HomeSignUp />
      </div>
      <div className="w-full px-4 lg:px-8">
        <HomeProductSection
          heading="trending listings"
          locale={locale}
          home
        />
      </div>

      <BannerSection />
      <ShopByStyleSection />
      <BlogSection />
    </main>
  );
}
