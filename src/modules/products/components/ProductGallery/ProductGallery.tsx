import { HttpTypes } from '@medusajs/types';

import { GalleryCarousel } from '@/components/organisms';

export const ProductGallery = ({ images }: { images: HttpTypes.StoreProduct['images'] }) => {
  if (!images || images.length === 0) return null;

  return (
    <div
      className="px-5"
      data-testid="product-gallery"
    >
      <GalleryCarousel images={images} />
    </div>
  );
};
