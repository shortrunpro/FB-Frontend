import { Footer, Header } from '@/modules/layout/templates';

export default async function AuthLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
