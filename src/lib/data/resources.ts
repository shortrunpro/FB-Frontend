import {
  Resource,
  StoreFetchResourceResponse,
  StoreGetResourceCategoryResponse,
  StoreGetResourcesResponse
} from '@/types/resources';

import { sdk } from '../config';

export const fetchResources = async ({ page }: { page: any }) => {
  return sdk.client.fetch<StoreGetResourcesResponse>('/store/resources', {
    query: { offset: (Number(page ?? 1) - 1) * 15 }
  });
};

export const fetchResourceByHandle = async ({ handle }: { handle: string }) => {
  return sdk.client.fetch<StoreFetchResourceResponse>(`/store/resources/${handle}`);
};

export const fetchResourceCategories = async ({ page }: { page: any }) => {
  return sdk.client.fetch<any>('/store/resources/category', {
    query: { offset: (Number(page ?? 1) - 1) * 15 }
  });
};

export const fetchResourceCategoryByHandle = async ({ handle }: { handle: string }) => {
  return sdk.client.fetch<StoreGetResourceCategoryResponse>(`/store/resources/category/${handle}`);
};
