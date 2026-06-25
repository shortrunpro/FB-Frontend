import { z } from 'zod';

import { validAddress, validCity, validName, validPhone } from '@/lib/helpers/regex';

export const FirstName = z
  .string()
  .nonempty({ message: 'First name is required' })
  .max(30, 'Max number of characters allowed for first name is 30')
  .regex(validName, 'Name can only contain letters, spaces, hyphens or apostrophes');
export const LastName = z
  .string()
  .nonempty({ message: 'Last name is required' })
  .max(30, 'Max number of characters allowed for last name is 30')
  .regex(validName, 'Name can only contain letters, spaces, hyphens or apostrophes');
export const PhoneNumber = z
  .string()
  .nonempty({ message: 'A valid phone number is required' })
  .min(10, 'Please provide a valid phone number')
  .max(15, 'Max number of characters allowed for phone number is 15')
  .regex(validPhone, 'Invalid phone number');
export const Email = z.email({ error: 'Please provide a valid email address' });
export const ProductMaterial = z
  .string()
  .nonempty({ message: 'Material is required' })
  .max(30, 'Max number of characters allowed for material is 30')
  .regex(validName, 'Material can only contain letters, spaces, hyphens or apostrophes');
export const Quantity = z.coerce
  .number<number>()
  .min(1, { message: 'Please provide a valid quantity' });
export const FileList = z.custom<File[]>();
export const AddressMain = z
  .string('Please provide a valid address')
  .nonempty({ message: 'Please provide a valid address' })
  .regex(validAddress, 'Invalid character found in address');
export const PostalCode = z
  .string('Please provide a valid zip code')
  .nonempty({ message: 'Postal Code is required' })
  .regex(/^[0-9a-zA-Z\s'-]+$/, 'please provide a valid zip code');
export const City = z
  .string('Please provide a valid city')
  .nonempty({ message: 'City is required' })
  .max(50, 'Max number of characters allowed for city is 50')
  .regex(validCity, 'Invalid character found');
export const Country = z.enum(['us', 'ca'], {
  error: 'Please select a Country'
});
