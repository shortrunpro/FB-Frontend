import { Footer, Header } from '@/components/organisms';

export default async function ResetPasswordLayout({
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
