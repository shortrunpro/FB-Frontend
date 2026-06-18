import { StoreProductCategory } from '@medusajs/types';

export interface Category {
  id: number;
  name: string;
  image: string;
  href: string;
}
export interface StaticCategoryListObject {
  id: number;
  name: string;
  image: string;
  handle: string;
}
interface ProductCategoryImage {
  category_id: string;
  file_id: string;
  id: string;
  type: string;
  url: string;
}
export interface CategoryListObject extends StoreProductCategory {
  product_category_image: ProductCategoryImage[];
  category_children: CategoryListObject[] | [];
}

export interface ListCategoriesResponse {
  parentCategories: CategoryListObject[];
  categories: CategoryListObject[];
}
