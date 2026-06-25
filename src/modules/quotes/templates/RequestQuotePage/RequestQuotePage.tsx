import { RequestQuoteContent, RequestQuoteForm } from '../../sections';

const RequestQuotePage = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-y-6 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px]">
      <h1 className="text-center text-3xl font-bold max-sm:text-2xl">Request A Custom Quote</h1>
      <RequestQuoteForm />
      <RequestQuoteContent />
    </div>
  );
};

export default RequestQuotePage;
