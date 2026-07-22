import { RequestQuoteContent, RequestQuoteForm } from '../../sections';

const RequestQuotePage = () => {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <h1 className="heading-lg text-center text-brand">Request A Custom Quote</h1>
      <RequestQuoteForm />
      <RequestQuoteContent />
    </div>
  );
};

export default RequestQuotePage;
