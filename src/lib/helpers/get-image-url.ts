export const getImageUrl = (image: string) => {
  return image.replace('http://localhost:9000/', process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || '');
};
