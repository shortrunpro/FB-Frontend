// TODO Remove unused imports after final decision is made
import {
  Cash,
  CreditCard,
  CurrencyDollarSolid,
  FlagMini,
  HandTruck,
  Tools,
  TruckFast,
  Wrench
} from '@medusajs/icons';

import { ProductBulletPoint } from '../../../types/product';

export const ProductBulletPoints = ({
  bulletPoints = []
}: {
  bulletPoints?: [] | ProductBulletPoint[];
}) => {
  const bullets = [
    {
      icon: <FlagMini />,
      text: 'Proudly Made in the USA'
    },
    {
      icon: <TruckFast />,
      text: 'Standard Orders Ship in 1-2 Business Days'
    },
    {
      icon: <Cash />,
      text: 'Large Volume Discounts Available'
    },
    {
      icon: <Wrench />,
      text: 'Ask us about Trade Discounts'
    },
    ...bulletPoints
  ];
  return (
    <ul className="text-black">
      {bullets.map(({ icon, text }) => (
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
