import { EmailLink, PhoneLink } from '@/components/atoms';

export const ContactLinks = () => {
  return (
    <div className="flex gap-x-6">
      <PhoneLink />
      <EmailLink />
    </div>
  );
};
