import Image from 'next/image';
import Link from 'next/link';

export const HomeParagraphSection2 = () => {
  return (
    <section className="flex w-full flex-col items-center gap-y-4 bg-brand_grey py-8 text-center">
      <h4 className="py-2 text-3xl font-bold text-brand">
        Support Products Designed to Meet Customer Needs
      </h4>
      <p className="w-1/2 px-8 text-gray-500">
        We have designed and engineered a wide range of support products based on identified
        consumer needs. Some of our top support categories include:
      </p>
      <ul className="grid w-1/3 list-inside list-disc grid-cols-2 gap-y-4 py-4 font-semibold text-brand underline">
        <li>
          <Link href={'#'}>Countertop Brackets</Link>
        </li>
        <li>
          <Link href={'#'}>Floating Shelves</Link>
        </li>
        <li>
          <Link href={'#'}>Bench Brackets</Link>
        </li>
        <li>
          <Link href={'#'}>Floating Vanity Supports</Link>
        </li>
        <li>
          <Link href={'#'}>Wood Corbel Systems</Link>
        </li>
        <li>
          <Link href={'#'}>Mantel Brackets</Link>
        </li>
      </ul>
      <div className="flex items-center justify-center gap-x-6">
        <Image
          src={'/fb-anvil.svg'}
          width={250}
          height={250}
          alt="Federal Brace Anvil"
        />
        <p className="w-1/4 text-gray-500">
          Don’t settle for the cheap, flimsy floating shelf or counter support brackets that are
          common in today’s marketplace. All of our products are manufactured in America to
          ISO-certified quality standards.
        </p>
        <Image
          src={'/proudly-american-flag.png'}
          width={250}
          height={250}
          alt="Proudly American Made"
        />
      </div>
    </section>
  );
};
