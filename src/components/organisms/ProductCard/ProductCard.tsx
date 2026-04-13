'use client';

import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';

import { Button } from '@/components/atoms';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { getProductPrice } from '@/lib/helpers/get-product-price';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';

export const ProductCard = ({
  product,
  className
}: {
  product: HttpTypes.StoreProduct | Product;
  className?: string;
}) => {
  if (!product) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({ product: product as HttpTypes.StoreProduct });
  const productName = String(product.title || 'Product');

  return (
    <div
      className={cn(
        'group relative flex w-full min-w-[250px] flex-col justify-between rounded-sm border p-1',
        className
      )}
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <div
        className="relative aspect-square h-full w-full bg-primary"
        data-testid="product-card-image-container"
      >
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`View ${productName}`}
          title={`View ${productName}`}
          data-testid="product-card-link"
        >
          <div className="align-center flex h-full w-full justify-center overflow-hidden rounded-sm">
            {product.thumbnail ? (
              <Image
                priority
                fetchPriority="high"
                src={decodeURIComponent(product.thumbnail)}
                alt={`${productName} image`}
                width={100}
                height={100}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-square h-full w-full rounded-xs object-cover object-center transition-all duration-300 lg:group-hover:-mt-14"
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
          </div>
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`See more about ${productName}`}
          title={`See more about ${productName}`}
        >
          <Button
            className="absolute bottom-1 z-10 hidden h-auto w-full rounded-sm bg-action uppercase text-action-on-primary lg:h-[48px] lg:group-hover:block"
            data-testid="product-card-see-more-button"
          >
            See More
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Go to ${productName} page`}
        title={`Go to ${productName} page`}
      >
        <div
          className="flex justify-between p-4"
          data-testid="product-card-info"
        >
          <div className="w-full">
            <h3
              className="heading-sm truncate"
              data-testid="product-card-title"
            >
              {product.title}
            </h3>
            <div
              className="mt-2 flex items-center gap-2"
              data-testid="product-card-price"
            >
              <p
                className="font-medium"
                data-testid="product-card-current-price"
              >
                {cheapestPrice?.calculated_price}
              </p>
              {cheapestPrice?.calculated_price !== cheapestPrice?.original_price && (
                <p
                  className="text-sm text-gray-500 line-through"
                  data-testid="product-card-original-price"
                >
                  {cheapestPrice?.original_price}
                </p>
              )}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  );
};
