import Link from 'next/link';

import { Button } from '@/modules/common/components';
import { UserNavigation } from '@/modules/users/components';

export default async function RequestSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="container">
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
        <UserNavigation />
        <div className="text-center md:col-span-3">
          <h1 className="heading-md uppercase">Return requested</h1>
          <p className="label-md mx-auto my-8 w-96 text-secondary">
            Your return request has been submitted. Once the seller confirms it, you will receive a
            confirmation email.
          </p>
          <Link href={`/user/returns${id && `?return=${id}`}`}>
            <Button className="label-md px-12 py-3 uppercase">Return details</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
