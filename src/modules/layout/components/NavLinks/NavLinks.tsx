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
        href="/media"
        className="hover:text-neutral-800"
      >
        Blog
      </Link>
      {/* TODO Figure out sitemap plan for resources */}
      <Link
        prefetch={false}
        href="/company"
        className="hover:text-neutral-800"
      >
        Company
      </Link>
      <Link
        prefetch={false}
        href="/content/category/3-resources"
        className="hover:text-neutral-800"
      >
        Blog
      </Link>
    </div>
  );
};
