'use client';

import { ArrowRight, StarSolid } from '@medusajs/icons';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="home-gradient w-full py-8 lg:py-12">
      <div className="container-columns flex w-full">
        <div className="flex w-full text-center lg:w-7/12 lg:text-start">
          <div className="flex w-full flex-col justify-center gap-y-4">
            <div className="flex items-center justify-center gap-x-3 lg:justify-normal">
              <div className="flex gap-x-2">
                <StarSolid />
                <StarSolid />
                <StarSolid />
                <StarSolid />
                <StarSolid />
              </div>
              <p className="heading-sm font-bold lg:text-sm/3">13k+ PROJECTS SERVED</p>
            </div>
            <h2 className="heading-2xl lg:heading-2xl flex flex-col gap-x-1 font-bold leading-none xl:text-6xl 3xl:text-7xl">
              <span>Heavy-Duty Metal</span>
              <span>Support Brackets</span>
            </h2>
            <p className="heading-sm lg:text-sm/10">100% USA-MADE EVERYTIME</p>
            <div className="flex w-full justify-center lg:justify-normal">
              <Link
                href={'/products'}
                className="flex items-center gap-x-2 rounded-full bg-action p-3 font-bold text-white hover:bg-brand"
              >
                SHOP NOW{' '}
                <ArrowRight
                  color="#ffffff"
                  className="rounded-badge border-2 border-solid border-[#49576E] bg-brand"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="home-swiper hidden w-5/12 justify-end lg:flex">
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
