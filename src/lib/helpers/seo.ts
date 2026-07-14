import { HttpTypes } from '@medusajs/types';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import { BASE_URL, SITE_NAME, ROBOTS_SEO_STRING } from '@/lib/config';
import { ResourceCategory } from '@/types/resources';

export const generateProductMetadata = async (
  product: HttpTypes.StoreProduct
): Promise<Metadata> => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';

  return {
    title: product?.title,
    description: `${product?.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    robots: ROBOTS_SEO_STRING,
    metadataBase: new URL(`${protocol}://${host}/products/${product?.handle}`),

    openGraph: {
      title: product?.title,
      description: `${product?.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      url: `${protocol}://${host}/products/${product?.handle}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url: product?.thumbnail || `${protocol}://${host}/images/placeholder.svg`,
          width: 1200,
          height: 630,
          alt: product?.title
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.title,
      description: `${product?.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      images: [product?.thumbnail || `${protocol}://${host}/images/placeholder.svg`]
    }
  };
};

export const generateCategoryMetadata = async (category: HttpTypes.StoreProductCategory) => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';

  return {
    robots: ROBOTS_SEO_STRING,
    metadataBase: new URL(`${protocol}://${host}/categories/${category.handle}`),
    title: `${category.name} Category`,
    description: `${category.name} Category - ${process.env.NEXT_PUBLIC_SITE_NAME}`,

    openGraph: {
      title: category.name,
      description: `${category.name} Category - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      url: `${protocol}://${host}/categories/${category.handle}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url:
            `${protocol}://${host}/images/categories/${category.handle}.png` ||
            `${protocol}://${host}/images/placeholder.svg`,
          width: 1200,
          height: 630,
          alt: category.name
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: `${category.name} Category - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      images: [
        `${protocol}://${host}/images/categories/${category.handle}.png` ||
          `${protocol}://${host}/images/placeholder.svg`
      ]
    }
  };
};

export const generateResourceCategoryMetadata = (resource_category: ResourceCategory) => {
  return {
    robots: ROBOTS_SEO_STRING,
    metadataBase: new URL(`${BASE_URL}/content/category/${resource_category.handle}`),
    title: resource_category.metadata?.meta_title ?? resource_category.title,
    description: resource_category.metadata?.meta_description,
    openGraph: {
      title: resource_category.metadata?.meta_title ?? resource_category.title,
      description: resource_category.metadata?.meta_description,
      url: `${BASE_URL}/content/category/${resource_category.handle}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${BASE_URL}/federal-brace-logo.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: resource_category.metadata?.meta_title ?? resource_category.title,
      description: resource_category.metadata?.meta_description,
      images: [
        {
          url: `${BASE_URL}/federal-brace-logo.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME
        }
      ]
    }
  };
};
