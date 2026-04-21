'use client';

import { useCallback, useEffect, useState } from 'react';

import { HttpTypes } from '@medusajs/types';
import { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import { Indicator } from '@/components/atoms';
import { cn } from '@/lib/utils';

export const ProductCarouselIndicator = ({
  slides = [],
  embla: parentEmbla
}: {
  slides: HttpTypes.StoreProduct['images'];
  embla?: EmblaCarouselType;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true,
    align: 'start'
  });

  const changeSlideHandler = useCallback(
    (index: number) => {
      if (!parentEmbla) return;
      parentEmbla.scrollTo(index);

      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [parentEmbla, emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!parentEmbla) return;

    onSelect(parentEmbla);
    parentEmbla.on('reInit', onSelect).on('select', onSelect);
  }, [parentEmbla, onSelect]);
  return (
    <div className="embla__dots pointer-events-none bottom-3 left-3 h-[2px] w-full lg:bottom-auto lg:top-3">
      <div className="pointer-events-auto lg:hidden">
        <Indicator
          step={selectedIndex + 1}
          size="large"
          maxStep={slides?.length || 0}
        />
      </div>

      <div
        className="embla pointer-events-auto relative hidden lg:block"
        data-testid="product-secondary-images-container"
      >
        <div
          className="embla__viewport overflow-hidden rounded-xs"
          ref={emblaRef}
        >
          <div className="embla__container grid h-fit grid-cols-5">
            {(slides || []).map((slide, index) => (
              <div
                key={slide.id}
                className="mb-3 cursor-pointer rounded-sm bg-primary"
                onClick={() => changeSlideHandler(index)}
              >
                <Image
                  src={decodeURIComponent(slide.url)}
                  alt="Product carousel Indicator"
                  width={500}
                  height={500}
                  className={cn(
                    'transition-color aspect-square h-full w-full rounded-sm border-2 object-fill duration-300',
                    selectedIndex === index ? 'border-primary' : 'border-tertiary'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
