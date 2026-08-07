'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { StoreProduct } from '@medusajs/types';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import Thumbnail from '../Thumbnail/Thumbnail';
import { Thumb } from './ThumbsButton';

type PropType = {
  slides: StoreProduct['images'];
  options?: EmblaOptionsType;
};

const ProductCarousel = (props: PropType) => {
  const { slides, options } = props;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    skipSnaps: true,
    dragFree: true
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    onScroll(emblaMainApi);

    emblaMainApi.on('select', onSelect).on('reInit', onSelect).on('scroll', onScroll);
  }, [emblaMainApi, onSelect, onScroll]);

  return (
    <div className="pg">
      <div
        className="pg-viewport max-h-[500px] md:max-h-full"
        ref={emblaMainRef}
      >
        <div className="pg-container mb-4">
          {slides &&
            slides.length > 0 &&
            slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="pg-slide flex h-full justify-center"
                data-testid={`product-carousel-slide-${idx}`}
              >
                <Thumbnail
                  thumbnail={slide.url}
                  size="square"
                  className="lg:full max-h-[600px] w-full"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex w-full md:hidden">
        <div className="embla__progress">
          <div
            className="embla__progress__bar"
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
      <div className="pg-thumbs hidden md:block">
        <div
          className="pg-thumbs__viewport"
          ref={emblaThumbsRef}
        >
          <div className="pg-thumbs__container flex-wrap">
            {slides &&
              slides.length > 1 &&
              slides.map((slide, index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  image={slide.url}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
