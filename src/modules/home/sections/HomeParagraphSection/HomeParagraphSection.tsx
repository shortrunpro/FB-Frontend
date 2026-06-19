import { BottomSection, ImageOverlay, TopSection } from './components';

export const HomeParagraphSection = () => {
  return (
    <section className="my-8 flex w-full flex-col gap-y-8 text-center text-lg">
      <h3 className="text-4xl font-bold text-brand">
        Unwavering Support Brackets for Uncompromised Style
      </h3>
      <div className="bg-gray-100">
        <TopSection />
        <ImageOverlay />
        <BottomSection />
      </div>
    </section>
  );
};
