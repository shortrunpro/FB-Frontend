import Image from 'next/image';

export const SupportProductsSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-y-4 py-8 text-center">
      <div className="flex items-center justify-center gap-x-6">
        <div className="relative hidden aspect-[133/86] w-full max-w-[266px] lg:block">
          <Image
            src={'/proudly-american-flag.png'}
            alt="Proudly American Made"
            fill={true}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h4 className="text-2xl font-bold text-brand">
            Support Products Designed to Meet Customer Needs
          </h4>
          <div className="flex w-full justify-center">
            <p className="leading-tight text-gray-500 2xl:w-1/2">
              Don’t settle for the cheap, flimsy floating shelf or counter support brackets that are
              common in today’s marketplace. All of our products are manufactured in America to
              ISO-certified quality standards.
            </p>
          </div>
        </div>
        <div className="relative hidden aspect-[1760/1173] w-full max-w-[325px] lg:block">
          <Image
            src={'/fb-anvil.webp'}
            alt="Federal Brace Anvil"
            fill={true}
          />
        </div>
      </div>
    </section>
  );
};
