import { Divider } from '@medusajs/ui';

export const BottomSection = () => {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-4 py-6 leading-tight lg:flex">
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Countertop Support Systems</h4>
        <span className="text-xs">
          Support brackets for granite, quartz, butcher block, and other countertop materials,
          helping create strong kitchen islands, breakfast bars, and overhangs.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Heavy-Duty Brackets</h4>
        <span className="text-xs">
          Heavy-duty steel support brackets built for demanding applications requiring exceptional
          load capacity and long-term reliability.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Wall Mounting Brackets</h4>
        <span className="text-xs">
          Versatile wall-mounted bracket solutions designed for shelving, displays, benches, and
          custom architectural installations.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Custom & Specialty Brackets</h4>
        <span className="text-xs">
          Specialty support brackets and custom fabrication solutions tailored to unique residential
          and commercial project requirements.
        </span>
      </div>
    </div>
  );
};
