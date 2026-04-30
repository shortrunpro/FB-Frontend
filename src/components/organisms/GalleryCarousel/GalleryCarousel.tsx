import { HttpTypes } from '@medusajs/types';

import { ProductCarousel } from '@/components/cells';

export const GalleryCarousel = ({ images }: { images: HttpTypes.StoreProduct['images'] }) => {
  return (
    <div
      className="w-full rounded-sm p-1"
      data-testid="gallery-carousel"
    >
      <ProductCarousel slides={images} />
    </div>
  );
};
