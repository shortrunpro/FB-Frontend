import Image from 'next/image';

import { FacebookLink, LinkedinLink, TwitterLink, YoutubeLink } from '@/components/atoms';

export function Footer() {
  return (
    <footer className="bg-base-200 px-10 pb-4 pt-10 text-base-content">
      <div className="footer">
        <aside>
          <Image
            src={'/fb-anvil.svg'}
            width={150}
            height={150}
            alt="Federal Brace Anvil"
          />
          <div className="flex w-full flex-row justify-center gap-2">
            <TwitterLink />
            <YoutubeLink />
            <FacebookLink />
            <LinkedinLink />
          </div>

          {/* <p>
            Federal Brace
            <br />
            Providing reliable brackets since 2010
          </p> */}
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
          <a className="link-hover link">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
          <a className="link-hover link">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </nav>
      </div>

      <aside className="mt-4 py-4 text-center">
        <p>Copyright © {new Date().getFullYear()} - Short Run Pro, LLC. All rights reserved.</p>
      </aside>
    </footer>
  );
}
