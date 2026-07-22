import { FaMapMarkedAlt } from 'react-icons/fa';

import { EmailLink, PhoneLink, StoreHours } from '@/modules/common/components';

export const ContactUsContent = () => {
  return (
    <div className="flex max-w-[500px] flex-col gap-y-4">
      <div className="flex flex-col gap-y-1">
        <h2 className="heading-md flex items-center gap-x-4">
          <FaMapMarkedAlt
            size={'1.25em'}
            className="text-brand"
          />
          Federal Brace
        </h2>
        <a
          href="https://maps.google.com/maps?q=710 E Catawba St, Suite A, Belmont, North Carolina, 28012, United States"
          target="_blank"
          className="heading-sm font-normal hover:text-neutral-800"
        >
          710 E Catawba St, Suite A, Belmont, North Carolina, 28012, United States
        </a>
        <div className="flex flex-col justify-between gap-2 md:flex-row lg:flex-col xl:flex-row">
          <PhoneLink className="heading-sm text-brand" />
          <EmailLink
            className="heading-sm mr-1 text-brand"
            variant="secondary"
          />
        </div>
      </div>
      <StoreHours />
    </div>
  );
};
