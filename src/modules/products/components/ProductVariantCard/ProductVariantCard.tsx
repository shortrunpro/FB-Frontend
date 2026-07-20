'use client';

import { Container } from '@medusajs/ui';
import Link from 'next/link';

import { AddToCartButton } from '@/modules/common/components';
import { VariantsSearchResponse } from '@/types/variants';

import Thumbnail from '../Thumbnail/Thumbnail';

// TODO proper type definition for variant
export default function ProductVariantCard({ variant }: { variant: VariantsSearchResponse }) {
  return (
    <div
      className="border-grey-8 hover:shadow-base hover:text-hover flex h-full flex-col justify-between gap-y-3 rounded-xl border-4 bg-brand_grey"
      data-testid="product-wrapper"
    >
      <Link
        href={`/products/${variant?.handle}`}
        className=" "
        // TODO GTM event implementation
        // onClick={() =>
        //   selectItem({
        //     ...strapiProduct,
        //     currentCategory,
        //   })
        // }
      >
        <Container className="relative aspect-square bg-white shadow-none">
          <Thumbnail
            thumbnail={variant?.thumbnail}
            size="square"
            data-testid="variant-card-thumbnail"
          />
        </Container>
        <div className="flex flex-col gap-y-1 p-2 text-left">
          <div className="heading-xs font-semibold">
            <span
              className="line-clamp-2"
              data-testid="variant-card-title"
            >
              {variant.title}
            </span>
          </div>
          <div className={`star_container ${variant?.sku}`}></div>
          <div className="heading-xs flex flex-col gap-y-1 sm:text-xs">
            {variant?.sku && <span data-testid="variant-card-sku">SKU: {variant?.sku}</span>}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between p-2">
        {/* TODO Slashed pricing for clearance */}
        <span
          className="heading-sm"
          data-testid="variant-card-price"
        >
          {variant?.calculated_price !== undefined && variant?.calculated_price !== null ? `$${variant.calculated_price.toFixed(2)}` : 'N/A'}
        </span>
        <div className="flex items-center justify-center gap-x-2 text-sm">
          {/* <div className="flex flex-col justify-center"></div> */}
          <div className="flex flex-col justify-center">
            <AddToCartButton
              variantId={variant.id}
              quantity={1}
              className="mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
