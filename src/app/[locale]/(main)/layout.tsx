import { redirect } from 'next/navigation';

import { Footer, Header } from '@/components/organisms';
import { checkRegion } from '@/lib/helpers/check-region';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const regionCheck = await checkRegion(locale);

  if (!regionCheck) {
    return redirect('/');
  }

  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer />
    </>
  );
}
