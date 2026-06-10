export const Spinner = ({ 'data-testid': dataTestId }: { 'data-testid'?: string }) => {
  return (
    <div
      className="loading loading-spinner loading-lg"
      data-testid={dataTestId ?? 'spinner'}
    ></div>
  );
};
