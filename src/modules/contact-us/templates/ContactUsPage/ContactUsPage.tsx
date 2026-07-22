import Link from 'next/link';

import { Divider } from '@/components/atoms';

import { ContactUsContent, ContactUsForm } from '../../components';

export const ContactUsPage = () => {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex w-full flex-col gap-y-4 lg:w-1/2">
        <ContactUsForm />
      </div>
      <div className="flex flex-col items-center justify-center align-middle">
        <Divider
          orientation="vertical"
          className="hidden h-3/4 border-dashed border-gray-300 text-brand lg:block"
        />
      </div>

      <div className="flex h-3/4 w-full flex-col justify-center lg:w-1/2">
        <ContactUsContent />
      </div>
    </div>
  );
};
