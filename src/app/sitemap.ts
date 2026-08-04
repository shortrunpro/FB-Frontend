import { MetadataRoute } from 'next';

import { BASE_URL } from '@/lib/config';
import { listBlogsSitemap } from '@/lib/data/blog';
import { listCategoriesSitemap } from '@/lib/data/categories';
import { listProducts } from '@/lib/data/products';
import { queryResources } from '@/lib/data/resources';
import { StoreFetchResourceCategories } from '@/types/resources';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    response: { products }
  } = await listProducts({
    countryCode: 'us',
    queryParams: {
      limit: 999,
      fields:
        'updated_at,handle,thumbnail,images.url,variants.thumbnail,variants.handle,variants.sku,variants.updated_at'
    }
  });
  const categories = await listCategoriesSitemap();
  const categoryMap = categories
    .map(c => ({
      url: `${BASE_URL}/categories/${c.handle}`,
      lastModified: c.updated_at,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      images: [c.product_category_image[0]?.url].filter(f => f)
    }))
    .flat();
  const { blogs } = await listBlogsSitemap();
  const blogsMap = blogs
    .map(b => ({
      url: `${BASE_URL}/blog/${b.handle}`,
      lastModified: b.updated_at,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      images: [b.main_image]
    }))
    .flat();
  const { resources } = await queryResources({
    query: {
      limit: 999,
      fields: 'handle,updated_at'
    },
    next: { tags: ['resource-handles'], revalidate: 86400 }
  });
  const resourceMap = resources
    .map((r: any) => ({
      url: `${BASE_URL}/content/${r.handle}`,
      lastModified: r.updated_at,
      changeFrequency: 'daily' as const,
      priority: 1.0
    }))
    .flat();
  const { resource_categories } = (await queryResources({
    url: '/category',
    query: { limit: 999, fields: 'handle,updated_at' },
    next: { tags: ['resource-handles'], revalidate: 3600 }
  })) as StoreFetchResourceCategories;
  const resourceCategoryMap = resource_categories
    .map(r => ({
      url: `${BASE_URL}/content/category/${r.handle}`,
      lastModified: r.updated_at,
      changeFrequency: 'daily' as const,
      priority: 1.0
    }))
    .flat();
  const productMap = products
    .map(p => ({
      url: `${BASE_URL}/products/${p.handle}`,
      lastModified: p.updated_at,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      images: [p.thumbnail, , ...(p.images?.map(i => i.url) as any)].filter(f => f)
    }))
    .flat();
  // TODO figure out if it is wise to add variants to the sitemap when they technnically are not canonical
  // const productMap = products
  //   .map(p => {
  //     let productEntry = {
  //       url: `${BASE_URL}/products/${p.handle}`,
  //       lastModified: p.updated_at,
  //       changeFrequency: 'daily' as const,
  //       priority: 1.0,
  //       images: [p.thumbnail, , ...(p.images?.map(i => i.url) as any)].filter(f => f)
  //     };
  //     let variantMap = p.variants?.map(v => ({
  //       url: `${BASE_URL}/products/${p.handle}?sku=${v.sku}`,
  //       lastModified: v.updated_at,
  //       changeFrequency: 'daily' as const,
  //       priority: 1.0,
  //       images: [v.thumbnail, ...(p.images?.map(i => i.url) as any)].filter(f => f)
  //     })) as any;
  //     return [productEntry, ...variantMap];
  //   })
  //   .flat();
  const dynamicEntries = [
    ...productMap,
    ...categoryMap,
    ...resourceMap,
    ...resourceCategoryMap,
    ...blogsMap
  ];
  const staticEntries = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/request-quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0
    }
  ];
  return [...staticEntries, ...(dynamicEntries as any)];
}
