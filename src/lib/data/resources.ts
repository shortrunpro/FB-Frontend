import {
  Resource,
  StoreFetchResourceResponse,
  StoreGetResourceCategoryResponse,
  StoreGetResourcesResponse
} from '@/types/resources';

import { sdk } from '../config';

/**
 *
 * @param url The base path is set to /store/resources, If you need a specific resource you would pass url: '/[handle]'
 * @param query Query paramaters based on medusajs
 * @param next Next cache tag and revalidation. Request is set to force-cache but without any revalidation or tags unless provided
 * @returns
 */
export const queryResources = async ({
  url = '',
  query,
  next
}: {
  url?: string;
  query?: Record<string, any>;
  next?: NextFetchRequestConfig;
}) => {
  return sdk.client.fetch(`/store/resources${url}`, {
    query,
    cache: 'force-cache',
    next
  });
};

export const fetchResources = async ({
  query,
  next = { tags: ['resources'], revalidate: 3600 }
}: {
  query: Record<string, any>;
  next?: NextFetchRequestConfig;
}): Promise<StoreGetResourcesResponse> => {
  return sdk.client.fetch<StoreGetResourcesResponse>('/store/resources', {
    query,
    cache: 'force-cache',
    next
  });
};

export const fetchResourceByHandle = async ({
  handle,
  query,
  next
}: {
  handle: string;
  query?: Record<string, any>;
  next?: NextFetchRequestConfig;
}) => {
  return sdk.client.fetch<StoreFetchResourceResponse>(`/store/resources/${handle}`, {
    query,
    cache: 'force-cache',
    next: next ? next : { tags: [`resource-${handle}`], revalidate: 3600 }
  });
};

export const fetchResourceCategories = async ({
  query,
  next = { tags: ['resource-categories'], revalidate: 3600 }
}: {
  query?: Record<string, any>;
  next?: NextFetchRequestConfig;
}) => {
  return sdk.client.fetch<any>('/store/resources/category', {
    query,
    cache: 'force-cache',
    next
  });
};

export const fetchResourceCategoryByHandle = async ({
  handle,
  query
}: {
  handle: string;
  query?: Record<string, any>;
}) => {
  return sdk.client.fetch<StoreGetResourceCategoryResponse>(`/store/resources/category/${handle}`, {
    query,
    cache: 'force-cache',
    next: { tags: [`resource-category-${handle}`], revalidate: 3600 }
  });
};
