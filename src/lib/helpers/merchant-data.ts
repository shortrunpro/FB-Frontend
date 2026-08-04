import { StoreProduct, StoreProductVariant } from '@medusajs/types';
import { Product, WithContext } from 'schema-dts';

import { BASE_URL } from '../config';

interface GenerateVariantMerchantSchemaProps {
  variant: StoreProductVariant;
  product: StoreProduct;
}
export const generateVariantMerchantSchema = ({
  variant,
  product
}: GenerateVariantMerchantSchemaProps) => {
  const url = `${BASE_URL}/products/${product.handle}?sku=${variant.sku}`;
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
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'USD',
      price: variant?.calculated_price?.calculated_amount as number,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock'
    },
    image: [variant?.thumbnail as string]
  };
  return JSON.stringify(jsonLd);
};
