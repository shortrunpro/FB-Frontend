import { EmailLink, PhoneLink } from '@/modules/common/components';

export const ContactLinks = () => {
  return (
    <div className="flex gap-x-6">
      <PhoneLink />
      <EmailLink />
    </div>
  );
};
