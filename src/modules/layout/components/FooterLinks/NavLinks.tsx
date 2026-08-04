import Link from 'next/link';

export const NavLinks = () => {
  return (
    <nav className="flex flex-col gap-y-4 text-sm/4">
      <Link
        href={'/'}
        className="link-hover link"
      >
        Home
      </Link>
      <Link
        href={'/products'}
        className="link-hover link"
      >
        Products
      </Link>
      <Link
        href={'/content/about-us'}
        className="link-hover link"
      >
        About Us
      </Link>
      <Link
        className="link-hover link"
        href={'/contact-us'}
      >
        Contact Us
      </Link>
      <Link
        href={'/blog'}
        className="link-hover link"
      >
        Blog
      </Link>
      <Link
        href={'/content/company-awards'}
        className="link-hover link"
      >
        Company Awards
      </Link>
      <Link
        href={'/content/our-partners'}
        className="link-hover link"
      >
        Distributors / Partners
      </Link>
      <Link
        href={'/reviews'}
        className="link-hover link"
      >
        Reviews
      </Link>
      <Link
        href={'/content/policies'}
        className="link-hover link"
      >
        Company Policies
      </Link>
    </nav>
  );
};
