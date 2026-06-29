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
      <div className="container-columns">
        <HomeCategories heading="POPULAR CATEGORIES" />
      </div>
      <HomeParagraphSection />
      <div className="container-columns w-full">
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
