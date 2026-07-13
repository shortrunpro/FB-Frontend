import { ReadonlyURLSearchParams } from 'next/navigation';

const getOption = (label: string) => {
  switch (label) {
    case 'size':
      return 'variants.size';
    case 'variants.finish':
      return 'variants.finish';
    case 'condition':
      return 'variants.condition';
    case 'rating':
      return 'average_rating';
    default:
      return '';
  }
};

export const getFacedFilters = (filters: ReadonlyURLSearchParams): string => {
  const parts: string[] = [];

  let minPrice = null;
  let maxPrice = null;

  for (const [key, value] of filters.entries()) {
    if (
      key !== 'min_price' &&
      key !== 'max_price' &&
      key !== 'sale' &&
      key !== 'query' &&
      key !== 'page' &&
      key !== 'products[page]' &&
      key !== 'sortBy' &&
      key !== 'rating'
    ) {
      const optionKey = getOption(key);
      if (optionKey && value) {
        const splitted = value.split(',');
        if (splitted.length > 1) {
          const joinedValues = splitted
            .map((val) => `${optionKey} = "${val}"`)
            .join(' OR ');
          parts.push(`(${joinedValues})`);
        } else {
          parts.push(`${optionKey} = "${splitted[0]}"`);
        }
      }
    } else {
      if (key === 'min_price') minPrice = value;
      if (key === 'max_price') maxPrice = value;

      if (key === 'rating' && value) {
        const optionKey = getOption(key);
        if (optionKey) {
          const splited = value.split(',');
          if (splited.length > 1) {
            const joinedValues = splited
              .map((val) => `${optionKey} >= ${val}`)
              .join(' OR ');
            parts.push(`(${joinedValues})`);
          } else {
            parts.push(`${optionKey} >= ${splited[0]}`);
          }
        }
      }
    }
  }

  // Handle price filtering using Meilisearch field name: 'variants.price'
  if (minPrice !== null && minPrice !== '' && maxPrice !== null && maxPrice !== '') {
    parts.push(`variants.price >= ${minPrice} AND variants.price <= ${maxPrice}`);
  } else if (minPrice !== null && minPrice !== '') {
    parts.push(`variants.price >= ${minPrice}`);
  } else if (maxPrice !== null && maxPrice !== '') {
    parts.push(`variants.price <= ${maxPrice}`);
  }

  return parts.join(' AND ');
};

