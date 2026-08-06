'use client';

import React from 'react';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { ProductCard } from '@/modules/products/components';
import { CustomProduct, RelatedProduct, RelatedProductProduct } from '@/types/product';

import { NextButton, PrevButton, usePrevNextButtons } from './CarouselArrowButtons';
import { DotButton, useDotButton } from './CarouselDotButton';

type PropType = {
  slides: CustomProduct[] | RelatedProductProduct[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div
        className="embla__viewport"
        ref={emblaRef}
      >
        <div className="embla__container">
          {slides.map(index => (
            <div
              className="embla__slide"
              key={index?.id}
            >
              <div className="embla__slide__number">
                <ProductCard product={index} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? 'embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
