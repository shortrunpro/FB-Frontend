export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string; sku: string }>;
}) {
  const { handle, sku } = await params;
  console.log(handle, sku);
  return (
    <main className="container flex-grow">
      <span>hehehehe</span>
    </main>
  );
}
