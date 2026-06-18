export function formatCardNumber(input: string) {
  return input
    .replace(/\D/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
}

export function formatExpiry(input: string) {
  return input.replace(/\D/g, '');
}

export function formatCVV(input: string) {
  return input.replace(/\D/g, '').slice(0, 4);
}
