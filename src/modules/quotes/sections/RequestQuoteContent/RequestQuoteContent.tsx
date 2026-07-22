import Image from 'next/image';

const RequestQuoteContent = () => {
  return (
    <div
      className="flex flex-col gap-y-8"
      data-testid="rfq-content-container"
    >
      <div
        className="my-6 flex justify-around gap-x-2 px-4"
        data-testid="rfq-content-images-container"
      >
        <Image
          className="inline-block max-sm:w-1/3"
          src={'/quotes/fb-rfq-full-support-img.jpg'}
          alt="Federal Brace Full Support Gurantee"
          width={200}
          height={200}
        />
        <Image
          className="inline-block max-sm:w-1/3"
          src={'/quotes/fb-rfq-made-in-usa-img.jpg'}
          alt="Federal Brace Made In The USA"
          width={200}
          height={200}
        />
        <Image
          className="inline-block max-sm:w-1/3"
          src={'/quotes/fb-rfq-quality-manufacture-img.png'}
          alt="Federal Brace Quality Manufacturing"
          width={200}
          height={200}
        />
      </div>
      <div
        className="flex flex-col gap-y-2"
        data-testid="rfq-content-guidlines-container"
      >
        <h2 className="heading-md">Guidlines</h2>
        <ul
          className="flex list-disc flex-col gap-y-4 pl-9"
          data-testid="rfq-content-guidlines-list"
        >
          <li>
            When determining Order Quantity please also consider whether a prototype run is desired
            for approval purposes.
          </li>
          <li>
            If part(s) will be reordered please provide estimated annual usage along with production
            run quantity.
          </li>
          <li>
            Provide part usage description in "Product Description" field along with any other
            important information related to the part.
          </li>
          <li>
            Drawing file formats accepted include: JPEG, PDF, IGS, DXF, DOC,TIF, PNG. PDF is
            preferred format for estimation.
          </li>
          <li className="list-item">
            In order to expedite your price quote please ensure that any drawing submitted includes
            all dimensional information on the part. Material thickness should also be noted in the
            "Material", "Product in Detail" fields or on the submitted drawings.
          </li>
        </ul>
      </div>
      <div
        className="flex flex-col gap-y-2"
        data-testid="rfq-content-tips-container"
      >
        <h2 className="heading-md">Tips</h2>
        <ul
          className="flex list-disc flex-col gap-y-4 pl-9"
          data-testid="rfq-content-tips-list"
        >
          <li>
            If you are unsure of your material selection, it will help if you provide a detailed
            description of the part use. Check out our resources on materials for details about the
            different characteristics of materials manufactured.
          </li>
          <li>
            Include as much information as available. Our estimation team can process your quote
            expeditiously without unnecessary delay if all necessary information on the part is
            submitted.
          </li>
          <li>
            Lead times may vary based on process requirements and cyclical production schedules. Our
            website, quoting forms and other business materials may specify a lead time. However,
            the most accurate available timing for production runs will be specified by our
            production staff when your job is entered onto the production floor.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequestQuoteContent;
