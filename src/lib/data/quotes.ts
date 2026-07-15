'use server';

import { fetchQuery } from '../config';

export const newQuote = async (payload: FormData) => {
  return fetchQuery('/store/quotes', {
    method: 'POST',
    body: payload
  });
};
