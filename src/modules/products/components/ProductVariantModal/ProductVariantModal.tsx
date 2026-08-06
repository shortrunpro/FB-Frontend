'use client';

import { StoreProduct, StoreProductVariant } from '@medusajs/types';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';

import { generateVariantMerchantSchema } from '@/lib/helpers/merchant-data';
import { Modal } from '@/modules/common/components';

import { ProductVariantModalTabs } from '../ProductVariantModalTabs/ProductVariantModalTabs';
import { AddToCartSection } from './AddToCartSection';

interface ProductVariantModalProps {
  variant: StoreProductVariant;
  product: StoreProduct;
}
const ProductVariantModal = ({ variant, product }: ProductVariantModalProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClose = () => {
    router.push(pathname);
  };
  const markup = generateVariantMerchantSchema({ variant, product });
  return (
    <>
      <Script
        id="ld-product-variant"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: markup
        }}
      />
      <Modal
        heading={`${variant.title as string}`}
        onClose={handleClose}
      >
        <div className="grid h-full grid-cols-2">
          <div className="relative aspect-square h-auto max-w-[500px]">
            <Image
              src={variant?.thumbnail ?? '/federal-brace-logo.jpg'}
              alt={`${variant.sku} Thumbnail`}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              className="w-fill h-auto object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-4 px-4">
            <ProductVariantModalTabs variant={variant} />
            <AddToCartSection
              variantId={variant.id}
              price={variant?.calculated_price?.calculated_amount as number}
            />{' '}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductVariantModal;
