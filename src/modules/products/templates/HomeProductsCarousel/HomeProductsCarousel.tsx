'use client';

import { A11y, Autoplay, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useScreenSize } from '@/hooks/useScreenSize';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/scrollbar';
// @ts-ignore
import 'swiper/css/mousewheel';

import { ProductCard } from '@/components/organisms';
import { Product } from '@/types/product';

type ScreenSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '';
export const HomeProductsCarousel = ({
  products
}: {
  products: Product[] | any;
  slidesPerView?: number;
}) => {
  const screenSize: ScreenSizes = useScreenSize();
  const screenMap = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    '2xl': 4,
    '': 4
  };
  return (
    <Swiper
      modules={[Virtual, A11y, Autoplay]}
      virtual
      slidesPerView={screenMap?.[screenSize]}
      spaceBetween={10}
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
    >
      {products.map((product: any, index: any) => (
        <SwiperSlide
          key={product.id}
          virtualIndex={index}
        >
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
