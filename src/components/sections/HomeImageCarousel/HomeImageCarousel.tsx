'use client';

import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import images from './images.json';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

export const HomeImageCarousel = () => {
  return (
    <div className="w-full px-12 py-4">
      <Swiper
        className="rounded-md"
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {images.map(image => {
          return (
            <SwiperSlide>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
