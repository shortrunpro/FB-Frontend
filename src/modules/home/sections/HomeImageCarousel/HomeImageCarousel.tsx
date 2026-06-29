'use client';

import { ArrowRight, StarSolid } from '@medusajs/icons';
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

import { Button } from '@/modules/common/components';

export const HomeImageCarousel = () => {
  return (
    <div className="home-gradient w-full py-12">
      <div className="container-columns flex w-full">
        <div className="flex w-7/12">
          <div className="flex w-full flex-col justify-center gap-y-4">
            <div className="flex items-center gap-x-3">
              <div className="flex gap-x-2">
                <StarSolid />
                <StarSolid />
                <StarSolid />
                <StarSolid />
                <StarSolid />
              </div>
              <p className="text-sm/3 font-bold">13k+ PROJECTS SERVED</p>
            </div>
            <h2 className="3xl:text-7xl flex flex-col font-bold leading-none lg:text-5xl xl:text-6xl">
              <span>Heavy-Duty Metal</span>
              <span>Support Brackets</span>
            </h2>
            <p className="text-sm/10">100% USA-MADE EVERYTIME</p>
            <div>
              <Button className="flex items-center gap-x-2 rounded-full font-bold hover:bg-brand">
                SHOP NOW{' '}
                <ArrowRight
                  color="#ffffff"
                  className="rounded-badge border-2 border-solid border-[#49576E] bg-brand"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="home-swiper flex w-5/12 justify-end">
          <Swiper
            className="ml-0 mr-0 max-w-[580px] rounded-md"
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {images.map(image => {
              return (
                <SwiperSlide key={image.src}>
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

{
}
