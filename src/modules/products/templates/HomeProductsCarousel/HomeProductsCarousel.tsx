'use client';

import { A11y, Autoplay, Navigation, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

export const HomeProductsCarousel = ({
  products,
  slidesPerView = 4
}: {
  products: Product[] | any;
  slidesPerView?: number;
}) => {
  return (
    <Swiper
      modules={[Virtual, A11y, Autoplay]}
      virtual
      slidesPerView={slidesPerView}
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
