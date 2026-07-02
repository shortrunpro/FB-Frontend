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
