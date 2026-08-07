import { HttpTypes } from '@medusajs/types';

import { GalleryCarousel } from '@/components/organisms';

import ProductCarousel from '../ProductCarousel/ProductCarousel';

export const ProductGallery = ({ images }: { images: HttpTypes.StoreProduct['images'] }) => {
  if (!images || images.length === 0) return null;

  return (
    <div
      className="px-5"
      data-testid="product-gallery"
    >
      <ProductCarousel slides={images} />
    </div>
  );
};
