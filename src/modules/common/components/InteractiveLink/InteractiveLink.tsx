import { ArrowUpRightMini } from '@medusajs/icons';
import { Text } from '@medusajs/ui';
import Link from 'next/link';

type InteractiveLinkProps = {
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const InteractiveLink = ({ href, children, onClick, ...props }: InteractiveLinkProps) => {
  return (
    <Link
      className="group flex items-center gap-x-1"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="mb-0 font-medium text-[#60a5fa]">{children}</Text>
      <ArrowUpRightMini
        className="duration-150 ease-in-out group-hover:rotate-45"
        color="#60a5fa"
      />
    </Link>
  );
};

export default InteractiveLink;
