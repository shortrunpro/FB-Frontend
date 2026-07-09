export interface StoreGetResource {
  handle: string;
  id: string;
  resource_category: {
    id: string;
    title: string;
  } | null;
  title: string;
}
export interface StoreGetResourcesResponse {
  resources: StoreGetResource[];
  count: number;
  limit: number;
  offset: number;
}
export interface Resource {
  title: string | undefined;
  subtitle?: string | undefined;
  content: Record<string, unknown> | undefined;
  handle: string | undefined;
  main_image?: string | null | undefined;
  metadata?: Record<string, unknown> | null | undefined;
  resource_category: {
    id: string;
    title: string;
  } | null;
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
