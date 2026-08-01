import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';

export const InstagramLink = ({ size = '1.5rem' }: { size?: string }) => {
  const link = process.env.NEXT_PUBLIC_INSTAGRAM_LINK ?? '';
  return (
    <Link
      href={link}
      target="_blank"
      className="rounded bg-white p-2 text-[#333333] transition-all duration-300 ease-in-out hover:bg-[#333333] hover:text-white"
    >
      <FaInstagram size={size} />
    </Link>
  );
};
