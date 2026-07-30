import { retrieveCustomer } from '@/lib/data/customer';
import { Footer, Header } from '@/modules/layout/templates';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const user = await retrieveCustomer().catch(() => null);
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      {children}
      <Footer user={user} />
    </div>
  );
}
