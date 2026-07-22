/**
 * @description Regex string allowing all letters ' - and spaces
 */
export const validName = /^[a-zA-Z\s'-]+$/;
/**
 * @description Regex string allowing all letters, numbers, spaces, and '-./,
 */
export const validBaseInput = /^[a-zA-Z0-9\s'-\.//,]+$/;
export const validAddress = /^[#".0-9a-zA-Z\s,\-\']+/;

/**
 * Allows all letters ' - . and spaces
 */
export const validCity = /^[a-zA-Z\s'-.]+$/;

/**
 * Only allows special characters associated with various phone numbers
 * @example
 * (123) 456-7890, +(123) 456-7890, +(123)-456-7890, +(123) - 456-7890, +(123) - 456-78-90
 * 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
 */
export const validPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
