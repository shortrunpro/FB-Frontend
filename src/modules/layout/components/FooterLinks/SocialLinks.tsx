import {
  FacebookLink,
  InstagramLink,
  LinkedinLink,
  PinterestLink,
  TikTokLink,
  YoutubeLink
} from '@/modules/common/components';

export const SocialLinks = () => {
  return (
    <div className="grid h-min w-fit grid-cols-2 gap-x-5 gap-y-3">
      <FacebookLink />
      <InstagramLink />
      <TikTokLink />
      <LinkedinLink />
      <YoutubeLink />
      <PinterestLink />
    </div>
  );
};
