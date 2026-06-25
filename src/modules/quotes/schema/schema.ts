import { z, ZodString } from 'zod';

import {
  FileList,
  FirstName,
  LastName,
  PhoneNumber,
  ProductMaterial,
  Quantity
} from '@/modules/common/schemas';

export const schema = z.object({
  first_name: FirstName,
  last_name: LastName,
  customer_id: z.string().nullable(),
  product_sku: z.string().nullable(),
  phone: PhoneNumber,
  email: z.email().nonempty({ message: 'Please provide a valid email address' }),
  company: z.string().nullable(),
  product_detail: z.string().nonempty({ message: 'Product description is required' }),
  quantity: Quantity,
  material: ProductMaterial,
  quote_type: z.enum(['RFQ', 'MTO']),
  files: FileList.nullable()
});
export type RequestQuoteSchemaKeys = keyof typeof schema.shape;
export const validateField = ({ name, value }: { name: RequestQuoteSchemaKeys; value: any }) => {
  const validateResult = schema.shape[name].safeParse(value);
  return validateResult;
};

export type RequestQuoteSchema = z.infer<typeof schema>;
