const ErrorMessage = ({
  error,
  'data-testid': dataTestid
}: {
  error?: string | null;
  'data-testid'?: string;
}) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="label-md-medium pl-2 pt-1 text-rose-500"
      data-testid={dataTestid}
    >
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
