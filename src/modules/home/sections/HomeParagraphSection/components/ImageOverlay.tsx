import { Button } from '@/modules/common/components';

export const ImageOverlay = () => {
  return (
    <div className="flex min-h-[450px] w-full flex-col justify-center gap-y-8 bg-[url(/home-paragraph-section/Floating-shelf-Kitchen-Image-darkened.jpg)] bg-cover py-4 text-white">
      <h4 className="text-4xl font-bold">Heavy-Duty, American-Made Support Brackets</h4>
      <div className="mx-auto flex w-1/2 flex-col gap-y-4 px-4 leading-tight">
        <p className="">
          {`Federal Brace manufactures a full line of support products for various residential,
          commercial, and industrial applications. From our countertop brackets and wood corbels to
          our heavy-duty floating shelves, you can trust that you'll be getting the ultimate
          combination of stylish design and adequate support. We're also known for our lines of
          bathroom supports, bench brackets, and mantel brackets.`}
        </p>
        <p>
          {`Whether you're searching for low-profile or hidden countertop supports, wall mounted desk
          supports, floating vanity brackets, or virtually any other support bracket application, we
          have a full line of support solutions to meet the needs of your project.`}
        </p>
      </div>
      <div>
        <Button className="px-6 py-4 hover:bg-gray-600">SHOP ALL HARDWARE</Button>
      </div>
    </div>
  );
};
