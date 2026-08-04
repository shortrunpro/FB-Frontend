export interface StoreGetResource {
  handle: string;
  id: string;
  resource_category: {
    id: string;
    title: string;
  } | null;
  title: string;
  updated_at?: string;
}
export interface StoreGetResourcesResponse {
  resources: StoreGetResource[];
  count: number;
  limit: number;
  offset: number;
}
export interface Resource {
  title: string;
  subtitle?: string | undefined;
  content: Record<string, unknown>;
  handle: string | undefined;
  main_image?: string | null | undefined;
  metadata?: Metadata;
  resource_category: {
    id: string;
    title: string;
    handle: string;
  };
}

export interface ResourceCategory {
  handle: string;
  main_image: string | null;
  metadata: Metadata;
  subtitle: string | null;
  title: string;
  items: ResourceCategoryItems[];
}
export interface StoreGetResourceCategoryResponse {
  data: ResourceCategory;
  ok: boolean;
}
export interface StoreFetchResourceCategories {
  resource_categories: {
    id: string;
    title: string;
    handle: string;
    updated_at?: string;
    metadata: {
      meta_title?: string;
      meta_description?: string;
    };
  }[];
  ok: boolean;
  count: number;
  limit: number;
  offset: number;
}
export interface StoreFetchResourceResponse {
  data: Resource;
  ok: boolean;
}
export interface ResourceCategoryItems {
  id: string;
  title: string;
  subtitle: string | null;
  handle: string;
  main_image: string | null;
}
interface Metadata {
  meta_title?: string;
  meta_description?: string;
}
