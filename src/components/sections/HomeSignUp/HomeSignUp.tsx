import Image from 'next/image';

import { ArrowRightIcon, FederalBraceAnvil } from '@/icons';

export const HomeSignUp = () => {
  return (
    <section className="bg-america-blue flex w-full rounded-sm px-12 py-8">
      <div className="card card-side h-20 w-1/2 place-items-center justify-center rounded-box text-white">
        <Image
          src={'/fb-anvil-white.svg'}
          width={100}
          height={100}
          alt="Federal Brace Anvil"
        />

        <div className="card-body flex-grow-0 gap-0 text-white">
          <p>Looking for pro pricing?</p>
          <h4 className="text-3xl font-bold">APPLY FOR A TRADE ACCOUNT</h4>
        </div>
      </div>
      <div className="card grid h-20 w-1/2 place-items-center rounded-box text-white">
        <button className="btn btn-outline btn-wide text-white">
          Sign Up{' '}
          <ArrowRightIcon
            color="#ffffff"
            size={20}
          />
        </button>
      </div>
    </section>
  );
};
