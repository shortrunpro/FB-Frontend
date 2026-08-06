'use client';

import { Container } from '@medusajs/ui';
import Image from 'next/image';
import Link from 'next/link';

import { getVariantOptions, getVariantPrices } from '@/lib/helpers/get-variant-data';
import { cn } from '@/lib/utils';
import { Button, FinishSquare } from '@/modules/common/components';
import { CustomProduct, Product, RelatedProductProduct } from '@/types/product';

import Thumbnail from '../Thumbnail/Thumbnail';

export const ProductCard = ({
  product,
  className
}: {
  product: CustomProduct | RelatedProductProduct;
  className?: string;
}) => {
  if (!product) {
    return null;
  }
  const { highestPrice, cheapestPrice } = getVariantPrices(product.variants as any[]);
  const { sizes, finishes } = getVariantOptions(product.variants as any[]);
  const productName = String(product.title || 'Product');
  return (
    <div
      className="border-grey-8 flex h-full w-full flex-col gap-y-3 rounded-xl border-4 bg-brand_grey transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl lg:max-w-[400px]"
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <Link
        href={`/products/${product.handle}`}
        aria-label={`View ${productName}`}
        title={`View ${productName}`}
        data-testid="product-card-link"
      >
        <Container className="relative aspect-square bg-white shadow-none">
          {product.thumbnail ? (
            <Thumbnail
              thumbnail={product.thumbnail}
              size="square"
              data-testid="product-card-image"
            />
          ) : (
            <Image
              priority
              fetchPriority="high"
              src="/images/placeholder.svg"
              alt={`${productName} image placeholder`}
              width={100}
              height={100}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              data-testid="product-card-placeholder-image"
            />
          )}
        </Container>
      </Link>
      <Link
        href={`/products/${product.handle}`}
        aria-label={`Go to ${productName} page`}
        title={`Go to ${productName} page`}
        className="h-full"
      >
        <div
          className="flex h-full justify-between p-4"
          data-testid="product-card-info"
        >
          <div className="flex w-full flex-col justify-between">
            <h3
              className="heading-sm w-full text-center font-bold"
              data-testid="product-card-title"
            >
              {product.title}
            </h3>
            <div className="flex flex-col gap-y-2">
              <div
                className="my-4 flex justify-between"
                data-testid="size-finish-container"
              >
                <span className="label-lg-medium">
                  {sizes.length} Size{sizes.length > 1 && 's'}
                </span>
                <div
                  className="label-md-semibold flex gap-x-2"
                  data-testid="product-finish-options"
                >
                  {finishes.length &&
                    finishes.map(f => (
                      <FinishSquare
                        key={f}
                        finish={f}
                      />
                    ))}
                </div>
              </div>

              <div
                className="mt-2 flex items-center gap-2"
                data-testid="product-card-price"
              >
                <p
                  className="label-lg w-full text-center"
                  data-testid="product-card-current-price"
                >
                  {cheapestPrice === highestPrice
                    ? `$${cheapestPrice?.toFixed(2)}`
                    : `$${cheapestPrice?.toFixed(2)} - $${highestPrice?.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
