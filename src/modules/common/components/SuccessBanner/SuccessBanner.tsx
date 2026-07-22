export const SuccessBanner = ({ message }: { message: string }) => {
  return (
    <div className="rounded-sm bg-[#def0d8] p-6">
      <p className="text-[#6e8e69]">{message}</p>
    </div>
  );
};
