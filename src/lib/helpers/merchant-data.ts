import { StoreProduct, StoreProductVariant } from '@medusajs/types';
import { Product, ProductGroup, WithContext } from 'schema-dts';

import { CustomProduct } from '@/types/product';

import { BASE_URL, SITE_NAME } from '../config';

interface GenerateVariantMerchantSchemaProps {
  variant: StoreProductVariant;
  product: StoreProduct;
}
export const generateVariantMerchantSchema = ({
  variant,
  product
}: GenerateVariantMerchantSchemaProps) => {
  const url = `${BASE_URL}/products/${product.handle}?sku=${variant.sku}`;
  const productImages =
    product.images && product?.images.length > 0 ? product.images?.map(i => i.url) : [];
  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': url,
    url: url,
    brand: {
      '@type': 'Brand'
    },
    name: variant?.title?.trim() as string,
    description: product.description as string,
    sku: variant?.sku?.trim() as string,
    color: variant.options?.find(f => f.option?.title === 'finish')?.value,
    size: variant.options?.find(f => f.option?.title === 'size')?.value,
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'USD',
      price: variant?.calculated_price?.calculated_amount as number,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock'
    },
    image: [variant?.thumbnail as string, ...productImages]
  };
  return JSON.stringify(jsonLd);
};
interface GenerateProductMerchantSchemaProps {
  product: StoreProduct;
}
export const generateProductMerchantSchema = (product: CustomProduct) => {
  const url = `${BASE_URL}/products/${product?.handle}`;
  const productImages =
    product.images && product?.images.length > 0 ? product.images?.map(i => i.url) : [];
  const jsonLd: WithContext<ProductGroup> = {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: product.title,
    description: product?.description ?? '',
    url: url,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    variesBy: ['https://schema.org/size', 'https://schema.org/color'],
    hasVariant: product.variants?.map(v => ({
      '@type': 'Product',
      sku: v.sku as string,
      image: [v.thumbnail ?? '', ...productImages],
      name: v.title as string,
      color: v.options?.find(f => f.option?.title === 'finish')?.value,
      size: v.options?.find(f => f.option?.title === 'size')?.value,
      offers: {
        '@type': 'Offer',
        url: `${url}?sku=${v.sku}`,
        priceCurrency: 'USD',
        price: v?.calculated_price?.calculated_amount as number,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock'
      }
    }))
  };
  return JSON.stringify(jsonLd);
};
