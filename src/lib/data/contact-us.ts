import { ContactUsSchema } from '@/modules/contact-us/components/ContactUsForm/schema';

import { sdk } from '../config';

export interface SendContactRequestResponse {
  type: string;
  message: string | null;
}
export const sendContactRequest = async (
  data: ContactUsSchema
): Promise<SendContactRequestResponse> => {
  return sdk.client.fetch('/store/contact-us', {
    method: 'POST',
    body: data
  });
};
