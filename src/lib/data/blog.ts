'use server';

import { BlogList } from '@/types/blog';

import { sdk } from '../config';

export const listBlogs = async ({ page }: { page: any }) => {
  return sdk.client.fetch<BlogList>('/store/blogs', {
    query: { offset: (Number(page ?? 1) - 1) * 15 }
  });
};
