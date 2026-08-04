'use server';

import { BlogList, BlogResponse } from '@/types/blog';

import { sdk } from '../config';

export const listBlogs = async ({ page }: { page: any }) => {
  return sdk.client.fetch<BlogList>('/store/blogs', {
    query: { offset: (Number(page ?? 1) - 1) * 15 }
  });
};

export const fetchBlogByHandle = async ({ handle }: { handle: string }) => {
  return sdk.client.fetch<BlogResponse>(`/store/blogs/${handle}`);
};

export const listBlogsSitemap = async () => {
  return sdk.client.fetch<BlogList>('/store/blogs', {
    query: {
      limit: 999,
      fields: 'handle,updated_at,main_image'
    },
    cache: 'force-cache',
    // Revalidates once every 24 hours
    next: { revalidate: 86400 }
  });
};
