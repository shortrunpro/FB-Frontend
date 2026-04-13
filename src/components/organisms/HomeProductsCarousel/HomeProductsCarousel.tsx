'use client';

import Image from 'next/image';
import {
  A11y,
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual
} from 'swiper/modules';
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

import { Product } from '@/types/product';

import { ProductCard } from '../ProductCard/ProductCard';

export const HomeProductsCarousel = ({
  locale,
  sellerProducts,
  home
}: {
  locale: string;
  sellerProducts: Product[] | any;
  home: boolean;
}) => {
  return (
    // <div className="">
    <Swiper
      modules={[Navigation, Pagination, Virtual, A11y, Autoplay]}
      navigation
      pagination={{ clickable: false }}
      virtual
      slidesPerView={4}
      spaceBetween={10}
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
    >
      {sellerProducts.map((product: any, index: any) => (
        <SwiperSlide
          key={product.id}
          virtualIndex={index}
        >
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>

    // </div>
  );
};
