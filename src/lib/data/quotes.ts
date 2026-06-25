import { RequestQuoteSchema, RequestQuoteSchemaKeys } from '@/modules/quotes/schema/schema';

import { fetchQuery } from '../config';

export const newQuote = async ({ formData }: { formData: RequestQuoteSchema }) => {
  const payload = new FormData();
  Object.keys(formData).forEach(key => {
    if (key === 'files' && formData.files?.length) {
      Array.from(formData.files).map((file: File) => {
        payload.append('files', file);
      });
    } else {
      // @ts-ignore
      payload.append(key, formData[key as RequestQuoteSchemaKeys]);
    }
  });
  return fetchQuery('/store/quotes', {
    method: 'POST',
    body: payload,
    formData: true
  });
};
