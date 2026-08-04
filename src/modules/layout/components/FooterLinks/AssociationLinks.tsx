import Image from 'next/image';
import Link from 'next/link';

export const AssociationLinks = () => {
  return (
    <div className="flex gap-x-2">
      <Link
        href={'https://www.cabinetmakers.org/'}
        target="_blank"
      >
        <Image
          src={'/footer/cma-footer.jpg'}
          width={32}
          height={35}
          alt="CMA Logo"
        />
      </Link>
      <Link
        href={'https://nkba.org/'}
        target="_blank"
      >
        <Image
          src={'/footer/nkba-footer.jpg'}
          width={102}
          height={35}
          alt="NKBA Logo"
        />
      </Link>
      <Link
        href={'https://www.aia.org/'}
        target="_blank"
      >
        <Image
          src={'/footer/aia-footer.jpg'}
          width={121}
          height={35}
          alt="AIA Logo"
        />
      </Link>
      <Link
        href={'https://nari.org/'}
        target="_blank"
      >
        <Image
          src={'/footer/nari-footer.jpg'}
          width={62}
          height={35}
          alt="NARI Logo"
        />
      </Link>
      <Link
        href={'https://www.isfanow.org/'}
        target="_blank"
      >
        <Image
          src={'/footer/isfa-footer.jpg'}
          width={93}
          height={35}
          alt="ISFA Logo"
        />
      </Link>
    </div>
  );
};
