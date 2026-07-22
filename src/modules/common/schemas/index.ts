import { z } from 'zod';

import {
  validAddress,
  validBaseInput,
  validCity,
  validName,
  validPhone
} from '@/lib/helpers/regex';

interface BaseTextFieldProps {
  nonemptyMessage?: 'Required field' | string;
  maxCharacterMessage?: 'Max characters allowed is 30' | string;
  maxCharacters?: 30 | number;
  regexMessage?: 'Input contains invalid characters' | string;
}
/**
 * @description Basic required text field with regex to disallow harmful special characters
 * @param {Object} params Error messages and max characters for zod string
 * @param {string=} [params.nonemptyMessage={Required Field}] Error message for empty fields
 * @param {string=} [params.maxCharacterMessage="Max Characters allowed is 30"] Error message for exceeding max characters
 * @param {number=} [params.maxCharacters=30] Max characters for field
 * @param {string=} [params.regexMessage="Input contains invalid characters"] Error message for failed regex test
 * @returns z.ZodString
 */
export const BaseTextField = ({
  nonemptyMessage = 'Required field',
  maxCharacters = 30,
  maxCharacterMessage = 'Max characters allowed is 30',
  regexMessage = 'Input contains invalid characters'
}: BaseTextFieldProps) => {
  return z
    .string()
    .nonempty({ message: nonemptyMessage })
    .max(maxCharacters, maxCharacterMessage)
    .regex(validBaseInput, regexMessage);
};
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
