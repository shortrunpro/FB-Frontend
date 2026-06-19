import {
  HomeCategories,
  HomeImageCarousel,
  HomeParagraphSection,
  HomeProductSection,
  SupportProductsSection
} from '@/modules/home/sections';

export const Homepage = () => {
  return (
    <>
      <HomeImageCarousel />
      <div className="mx-auto w-full max-w-[1400px]">
        <HomeCategories heading="POPULAR CATEGORIES" />
      </div>
      <HomeParagraphSection />
      <div className="mx-auto w-full max-w-[1400px]">
        <SupportProductsSection />
        <HomeProductSection
          heading="popular products"
          locale={'us'}
          home
        />
      </div>
    </>
  );
};
