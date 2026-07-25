import { Divider } from '@medusajs/ui';

export const TopSection = () => {
  return (
    <div className="mx-auto hidden max-w-[1400px] grid-cols-2 gap-y-4 py-6 leading-tight lg:flex">
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Kitchen Brackets</h4>
        <span className="text-xs">
          American-made countertop brackets, bartop supports, cabinet brackets, and kitchen shelf
          brackets designed to support overhangs, islands, and cabinetry with dependable strength.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Shelving Solutions</h4>
        <span className="text-xs">
          Shelf brackets, floating shelf brackets, hidden shelf supports, heavy-duty shelf brackets,
          and wood corbels that provide durable support while maintaining a clean, finished
          appearance.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Home & Decorative Brackets</h4>
        <span className="text-xs">
          Decorative brackets, floating bench supports, vanity brackets, and shower bench brackets
          that combine style and functionality for bathrooms, living spaces, and custom projects.
        </span>
      </div>
      <Divider
        orientation="vertical"
        variant="solid"
        className="hidden h-auto border-gray-400 lg:block"
      />
      <div className="flex flex-col gap-y-3 px-4">
        <h4 className="font-semibold text-brand">Mantel & Fireplace Brackets</h4>
        <span className="text-xs">
          Mantel mounting brackets engineered to securely support fireplace mantels and decorative
          installations while maintaining a seamless appearance. Mantel kits and standalone brackets
          available.
        </span>
      </div>
    </div>
  );
};
