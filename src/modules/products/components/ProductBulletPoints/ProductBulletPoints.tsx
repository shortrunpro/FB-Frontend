import Link from 'next/link';
import { FaFlagUsa, FaRegFlag } from 'react-icons/fa6';
import { LiaFlagUsaSolid, LiaShippingFastSolid } from 'react-icons/lia';
import { MdOutlineDiscount } from 'react-icons/md';

import { UsaFlag } from '@/modules/common/icons';
import { ProductBulletPoint } from '@/types/product';

export const ProductBulletPoints = ({
  bulletPoints = []
}: {
  bulletPoints?: [] | ProductBulletPoint[];
}) => {
  return (
    <ul className="label-sm-medium text-brand">
      <li className="flex items-center gap-x-2 py-1">
        <UsaFlag />
        <span className="">Proudly Made in the USA</span>
      </li>
      <li className="flex items-center gap-x-2 py-1">
        <MdOutlineDiscount className="text-base text-black" />
        <span className="">
          Large Volume and Trade Discounts Available -{' '}
          <Link
            href={'/contact-us'}
            target="_blank"
            className="text-[#60a5fa] underline"
          >
            Learn More
          </Link>
        </span>
      </li>
      <li className="flex items-center gap-x-2 py-1">
        <LiaShippingFastSolid className="text-base text-black" />
        <span className="">Standard Orders Ship in 1-2 Business Days</span>
      </li>
      {bulletPoints.length > 0 &&
        bulletPoints.map(({ icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-x-2 py-1"
          >
            {icon}
            <span className="text-md font-bold">{text}</span>
          </li>
        ))}
    </ul>
  );
};
