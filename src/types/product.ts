import { HttpTypes } from '@medusajs/types';

export interface AdditionalAttributeProps {
  id: string;
  attribute_id: string;
  value: string;
  attribute: {
    id: string;
    name: string;
  };
}

export interface Product {
  id: number;
  brand: string;
  handle: string;
  title: string;
  size: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  created_at: string;
  sold?: boolean;
}

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

export interface SingleProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface SingleProductReview {
  id: string;
  rating: number;
  username: string;
  created_at: string;
  customer: { first_name: string; last_name: string };
  customer_note: string;
  image: string;
  updated_at: string;
}

export interface SingleProductMeasurement {
  label: string;
  inches: string;
  cm: string;
}

export interface SingleProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  colorVariants?: {
    variant: string;
    label: string;
    disabled: boolean;
  }[];
  size: string;
  sizeVariants?: { label: string; disabled: boolean }[];
  condition: string;
  images: SingleProductImage[];
  details: string;
  measurements: SingleProductMeasurement[];
  shippingReturns: string;
  reviews: SingleProductReview[];
  tags: string[];
  postedDate: string;
}

export type ProductFile = {
  id: string;
  product_id: string;
  type: string;
  url: string;
};
export type ProductBulletPoint = {
  icon: any;
  text: string;
};
export interface ProductWithFiles extends HttpTypes.StoreProduct {
  files?: ProductFile[];
}
export interface CustomProduct extends HttpTypes.StoreProduct {
  files?: ProductFile[];
  addons?: ProductAddon;
  related_product?: RelatedProduct;
}
export interface ProductAddon {
  id: string;
  product_id: string;
  variant_ids: string[];
  variants: HttpTypes.StoreProductVariant[];
}
interface RelatedProductVariantPrices {
  amount: number;
  id: string;
}
interface RelatedProductVariant {
  id: string;
  prices: RelatedProductVariantPrices[];
}
export interface RelatedProductProduct {
  title: string;
  thumbnail?: string;
  handle: string;
  id: string;
  variants: RelatedProductVariant[];
}
export interface RelatedProduct {
  related_product_id: string[];
  id: string;
  products: RelatedProductProduct[];
}

export interface BulkAddToCartParams {
  [key: string]: number | string;
}
