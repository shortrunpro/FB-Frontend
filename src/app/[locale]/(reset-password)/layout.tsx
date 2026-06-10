import { Footer, Header } from '@/components/organisms';

export default async function ResetPasswordLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer />
    </>
  );
}
