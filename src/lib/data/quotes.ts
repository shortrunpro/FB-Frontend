'use server';

import { fetchQuery } from '../config';

export const newQuote = async (payload: FormData) => {
  try {
    return await fetchQuery('/store/quotes', {
      method: 'POST',
      body: payload
    });
  } catch (error) {
    console.error('Failed to submit quote:', error);
    return {
      ok: false,
      status: 502,
      error: { message: 'Unable to submit the quote request' },
      data: null
    };
  }
};
