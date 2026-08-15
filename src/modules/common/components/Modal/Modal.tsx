import { CloseIcon } from '@/icons';

export const Modal = ({
  children,
  heading,
  onClose,
  'data-testid': dataTestId
}: {
  children: React.ReactNode;
  heading: string;
  onClose: () => void;
  'data-testid'?: string;
}) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full justify-center"
      data-testid={dataTestId ?? 'modal'}
    >
      <div
        className="absolute h-full w-full bg-tertiary/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute z-20 my-20 h-full max-h-[80vh] w-full max-w-[80vw] overflow-y-auto rounded-sm bg-primary py-5 shadow-lg">
        <div className="heading-md flex items-center justify-between border-b px-4 pb-5 uppercase">
          <div className="flex flex-col">
            <h3 className="heading-sm">{heading}</h3>
            <div
              id="product_just_stars"
              className="aside reg"
              role="region"
              aria-label="Product rating summary"
            />
          </div>

          <div
            onClick={onClose}
            className="cursor-pointer"
          >
            <CloseIcon size={20} />
          </div>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
};
