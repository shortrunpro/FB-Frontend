import { z } from 'zod';

import { BaseTextField, Email } from '@/modules/common/schemas';

export const schema = z.object({
  subject: BaseTextField({}),
  email: Email,
  company: z.string().nullable(),
  message: z
    .string()
    .nonempty({ message: 'Please provide insight into how we can best assist you today' })
});
export type ContactUsSchemaKeys = keyof typeof schema.shape;
export const validateField = ({ name, value }: { name: ContactUsSchemaKeys; value: any }) => {
  const validateResult = schema.shape[name].safeParse(value);
  return validateResult;
};

export type ContactUsSchema = z.infer<typeof schema>;
