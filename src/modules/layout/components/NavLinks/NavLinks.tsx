import Link from 'next/link';

export const NavLinks = () => {
  return (
    <div className="hidden gap-x-3 md:flex">
      <Link
        prefetch={false}
        href="/request-quote"
        className="hover:text-neutral-800"
      >
        Request a Quote
      </Link>
      <Link
        prefetch={false}
        href="/categories/clearance"
        className="hover:text-neutral-800"
      >
        Clearance
      </Link>
      <Link
        prefetch={false}
        href="/blog"
        className="hover:text-neutral-800"
      >
        Blog
      </Link>
      <Link
        prefetch={false}
        href="/content/category/company"
        className="hover:text-neutral-800"
      >
        Company
      </Link>
      <Link
        prefetch={false}
        href="/content/category/resources"
        className="hover:text-neutral-800"
      >
        Resources
      </Link>
    </div>
  );
};
